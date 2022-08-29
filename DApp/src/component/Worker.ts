import { promises as fsPromises } from 'fs';
import QueryParser from "./QueryParser";
import IWorker from "./IWorker";
import DirectoriesCollector from "./DirectoriesCollector";
import Desmosdk from "./Desmosdk";
import { collect, consensus } from "./consensus/dataCollector";

import EncoderLightManual from "./encoder/EncoderLightManual";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";
import Config from "../const/Config";
import Logger from "./Logger";

const componentName = "Worker";

export default class Worker implements IWorker {

  collector: DirectoriesCollector;
  iexecOut: string;
  logger: Logger;
  cb?: (r: any) => void;

  constructor(defualtPathOut: string | undefined) {
    this.logger =Logger.getInstance();
    this.collector = new DirectoriesCollector();
    //The environment IEXEC_OUT has the priority
    //in order to allow the run of the DApp outside the Docker image
    //(which will use the env var 'IEXEC_OUT')
    //you can set the "defualtPathOut"
    if (process.env.IEXEC_OUT !== undefined) {
      this.iexecOut = process.env.IEXEC_OUT;
    } if (defualtPathOut !== undefined) {
      this.iexecOut = defualtPathOut;
    } else {
      this.iexecOut = "";
    }
    console.info = () => { };
    console.debug = () => { };
    console.warn = () => { };

  }

  err(err: string): void {
    console.log("ERROR: " + err);
    this.logger.addLog(componentName, err, true);
    this.logger.sendLogs(() => {
      if (this.cb !== undefined) {
        this.cb(null);
      } else {
        process.exit(1);
      }
    });

  }

  async work(query: string, requestID: string) {

    this.logger.setRequestID(requestID);
    this.logger.addLog(componentName,"QUERY is: "+ query);

    if (this.iexecOut.trim().length === 0) {
      this.err("No IEXEC_OUT!");
    }
    //HERE WE NEED RESOLVE requestID and get
    //query and directoriesList from new DSEMO-SDK
    const directoriesList = await new Desmosdk().getTDDsByRequestID(requestID);
    const parser = new QueryParser(query);
   try {
      this.logger.addLog(componentName, "Parsing query ...");
      parser.parse();
    } catch (e: any) {
      this.err(e.message);
    }
    if (!parser.isValid()) {
      this.err("Query not valid!");
    }
    else if (directoriesList.length < Config.AUTOCORRELATION) {
      this.err("Directories list length must be at least " + Config.AUTOCORRELATION + ".");
    } else if (directoriesList.length % 4 !== 0) {
      this.err("Directories list must be multipler of 4 and at least 4.");
    } else if (directoriesList.length > Config.MAX_DIRECTORY_LIST_SIZE) {
      this.err("Directories list must at most of " + Config.MAX_DIRECTORY_LIST_SIZE + ".");
    }
    else {
      this.logger.addLog(componentName, "Collect Directories and TDs ...");
      const realWork = async () => {
        await this.collector.init();
        //###########################Retrieve values
        const sources = await this.collector.collectDirs(directoriesList, parser);
        
        this.logger.addLog(componentName, "Collect values ...");
        if (parser.isAskingForNumber()) {
          this.logger.addLog(componentName, "###INFO###: Using NumberSourceValues.");
        } else if (parser.isAskingForString()) {
          this.logger.addLog(componentName, "###INFO###: Using StringSourceValues.");
        } else if (parser.isAskingForBoolean()) {
          this.logger.addLog(componentName, "###INFO###: Using BoolSourceValues.");
        } else {
          this.err("Result Type of the request unknow!");
        }

          var sourceValues = new Array<ISourceValues>();
          const keys = sources.keys();
          for (let key of keys) {
            const tds = sources.get(key);
            if (tds !== undefined) {
              for (var y = 0; y < tds.length; y++) {
                if (parser.isAskingForNumber()) {
                  sourceValues.push(new NumberSourceValues(tds[y]));
                } else if (parser.isAskingForString()) {
                  sourceValues.push(new StringSourceValues(tds[y]));
                } else if (parser.isAskingForBoolean()) {
                  sourceValues.push(new BoolSourceValues(tds[y]));
                } else {
                  this.err("Result Type of the request unknow!");
                }
              }
            } else {
              this.err("TDs undefined for Directory index: " + key);
            }
          }
          this.logger.addLog(componentName,"###: " + sourceValues.length);
          const s = await collect(sourceValues);
            //###########################Compute result
            const result = consensus(s);
            this.logger.addLog(componentName,"############## Consensus result ##############");
            this.logger.addLog(componentName,result.toString());
            this.logger.addLog(componentName,"##############################################");
            //###########################Ecode result
            var callback_data = result.getEncodedValue(new EncoderLightManual(requestID.substring(2)));

            //###########################Write result
            const computedJsonObj = {
              'callback-data': callback_data
            };

            this.logger.addLog(componentName,"computedJsonObj: " +JSON.stringify(computedJsonObj));

            const finalLoggerCall =(msg:string, isErr:boolean)=>{
                this.logger.addLog(componentName,msg,isErr);
                this.logger.addLog(componentName,"DAPP ENDS");
                this.logger.sendLogs(()=>{});
            }

            if (this.cb !== undefined) {
              this.cb(computedJsonObj);
            } else {
              fsPromises.writeFile(
                `${this.iexecOut}/computed.json`,
                JSON.stringify(computedJsonObj),
              ).then((ris)=>{
                  finalLoggerCall("fsPromises.writeFile finished!",false);
              }).catch((err)=>{
                finalLoggerCall(err,true);
              });
            }
      }
      try{
        await realWork();
      }catch(generalErr){
        if(generalErr instanceof Error){
          this.err(generalErr.message);
        }else{
          this.err("Unknow error!");
        }
      }
    }
  }

  setCB(cb: (ris: any) => void): void {
    this.cb = cb;
  }
}




