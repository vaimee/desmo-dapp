import { promises as fsPromises } from 'fs';
import QueryParser from "./QueryParser";
import { IExecResult, IWorker } from "./IWorker";
import DirectoriesCollector from "./DirectoriesCollector";
import Desmosdk from "./Desmosdk";
import { collect, consensus } from "./consensus/dataCollector";

import EncoderLightManual from "./encoder/EncoderLightManual";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";
import Config from "../const/Config";
import Query from '../model/Query';

const componentName = "Worker";

export default class Worker implements IWorker {

  collector: DirectoriesCollector;
  iexecOut: string;

  constructor(iexecOut:string) {
    this.iexecOut=iexecOut;
    this.collector = new DirectoriesCollector();
  }

  err(err: string): void {
    console.log("ERROR: " + err);
  }

  async work(query: string|Query, requestID: string): Promise<IExecResult> {
    console.log(componentName, "QUERY is: " + query);
    console.log(componentName, "resolve directory list");
    //HERE WE NEED RESOLVE requestID and get
    //query and directoriesList from new DSEMO-SDK
    const directoriesList = await new Desmosdk().getTDDsByRequestID(requestID);
    console.log(componentName, "directory list is:", directoriesList);
    
    console.log(componentName, "Parsing query ...");
    const parser = new QueryParser(query);
    parser.parse();

    if(!parser.isValid()) {
      throw new Error(`${componentName} Query is not valid: ${query}`);
    }

    if (directoriesList.length < Config.AUTOCORRELATION) {
      throw new Error(`${componentName} Not directories to compute autocorrelation: ${directoriesList.length}`);
    }

    if (directoriesList.length % 4 !== 0) {
      throw new Error(`${ componentName }"Number of directories must be multiple of 4`);
    }

    if (directoriesList.length > Config.MAX_DIRECTORY_LIST_SIZE) {
      throw new Error(`${componentName}"Directories list must at most of ${Config.MAX_DIRECTORY_LIST_SIZE}.`);
    }
    
    console.log(componentName, "Collect Directories and TDs ...");
    await this.collector.init();

    const sources = await this.collector.collectDirs(directoriesList, parser);

    console.log(componentName, "Collect values ...");
    if (parser.isAskingForNumber()) {
      console.log(componentName, "###INFO###: Using NumberSourceValues.");
    } else if (parser.isAskingForString()) {
      console.log(componentName, "###INFO###: Using StringSourceValues.");
    } else if (parser.isAskingForBoolean()) {
      console.log(componentName, "###INFO###: Using BoolSourceValues.");
    } else {
      throw new Error("Asked result Type of the request unknown!");
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
          } 
        }
      } else {
        console.log("###WARNING###","TDs undefined for Directory index: " + key);
      }
    }
    console.log(componentName, "###: " + sourceValues.length);
    const s = await collect(sourceValues);
    //###########################Compute result
    const result = consensus(s);
    console.log(componentName, "############## Consensus result ##############");
    console.log(componentName, result.toString());
    console.log(componentName, "##############################################");
    //###########################Ecode result
    var callback_data = result.getEncodedValue(new EncoderLightManual(requestID.substring(2)));

    //###########################Write result
    return {
      'callback-data': callback_data
    };
  }
}




