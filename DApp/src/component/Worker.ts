import { promises as fsPromises } from 'fs';
import QueryParser from "./QueryParser";
import IWorker from "./IWorker";
import DirectoriesCollector from "./DirectoriesCollector";
import Desmosdk from "./Desmosdk";
import { collect, consensus } from "./consensus/dataCollector";

import EncoderManual from "./encoder/EncoderManual";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";
import ISource from '../model/ISource';


export default class Worker implements IWorker {

  collector: DirectoriesCollector;
  iexecOut: string;
  cb?:(r:any)=>void;

  constructor(forcePathOut:string|undefined) {
    this.collector = new DirectoriesCollector();
    if(forcePathOut===undefined ){
      if(process.env.IEXEC_OUT!==undefined){
        this.iexecOut = process.env.IEXEC_OUT;
      }else{
        this.iexecOut="";
        this.err("No IEXEC_OUT!");
      }
    }else{
      this.iexecOut =forcePathOut;
    }
    console.info=()=>{};
    console.debug =()=>{};
    console.warn =()=>{};

  }

  err(err: string): void {
    console.log("ERROR: " + err);
    if(this.cb!==undefined){
      this.cb(null);
    }else{
      process.exit(1);
    }
  }

  work(query:string,requestID: string): void {
    //HERE WE NEED RESOLVE requestID and get
    //query and directoriesList from new DSEMO-SDK
    const directoriesList=new Desmosdk().getTDDsByRequestID(requestID);
    const parser = new QueryParser(query);
    try {
      console.log("Parsing query ...");
      parser.parse();
    } catch (e: any) {
      this.err(e.message);
    }
    if (!parser.isValid()) {
      this.err("Query not valid!");
    } else if (directoriesList.length < 4) {
      // this.err("Directories list must be multipler of 4 and at least 4.");
      this.err("Directories list length must be at least 4.");
    } else {
      console.log("Collect Directories and TDs ...");
      (async () => {
        try {
          await this.collector.init();
          //###########################Retrieve values
          this.collector.collectDirs(directoriesList, parser, (sources: Map<string, Array<ISource>>) => {
            console.log("Collect values ...");
            if (parser.isAskingForNumber()) {
              console.log("###INFO###: Using NumberSourceValues.");
            } else if (parser.isAskingForString()) {
              console.log("###INFO###: Using StringSourceValues.");
            } else if (parser.isAskingForBoolean()) {
              console.log("###INFO###: Using BoolSourceValues.");
            } else {
              this.err("Result Type of the request unknow!");
              // break; //no need, this.err will exit 
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
                    // break; //no need, this.err will exit 
                  }
                }
              } else {
                this.err("TDs undefined for Directory index: " + key);
                // break; //no need, this.err will exit 
              }
            }
            console.log("###: "+ sourceValues.length);
            collect(sourceValues,
              async (s) => {

                //###########################Compute result
                try {
                    const result = consensus(s);
                    console.log("############## Consensus result ##############");
                    console.log( result.toString());
                    console.log("##############################################");
                    //###########################Ecode result
                    var callback_data = result.getEncodedValue(new EncoderManual());

                    //###########################Write result
                    const computedJsonObj = {
                      'callback-data': callback_data
                    };

                    await fsPromises.writeFile(
                      `${this.iexecOut}/computed.json`,
                      JSON.stringify(computedJsonObj),
                    );

                    console.log("computedJsonObj", computedJsonObj);
                    if(this.cb!==undefined){
                      this.cb(computedJsonObj);
                    }

                } catch (e:any) {
                  this.err(e.message);
                }

              }
            );
          });
        } catch (e: any) {
          this.err(e.message);
        }
      })();
    }
  }

  setCB(cb:(ris:any)=>void):void{
    this.cb=cb;
  }
}




