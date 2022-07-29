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
import Config from "../const/Config";
import MockSourceNumb from "../MockSourceNumb";
import Result from "../model/Result";

const run_test = function (sources: Array<NumberSourceValues>, cb: (ris: Result) => void) {
  
  collect(sources,
      (s) => {

          
          console.log("\n###########################Sources after collect");
          for(var x in s){
              console.log(s[x].toInfoString())
          }
          cb(consensus(s));
      }
  );
}
export default class Worker implements IWorker {

  collector: DirectoriesCollector;
  iexecOut: string;
  cb?: (r: any) => void;

  constructor(forcePathOut: string | undefined) {
    this.collector = new DirectoriesCollector();
    if (forcePathOut === undefined) {
      if (process.env.IEXEC_OUT !== undefined) {
        this.iexecOut = process.env.IEXEC_OUT;
      } else {
        this.iexecOut = "";
      }
    } else {
      this.iexecOut = forcePathOut;
    }
    console.info = () => { };
    console.debug = () => { };
    console.warn = () => { };

  }

  err(err: string): void {
    console.log("ERROR: " + err);
    if (this.cb !== undefined) {
      this.cb(null);
    } else {
      process.exit(1);
    }
  }

  work(query: string, requestID: string) {
    if (this.iexecOut.trim().length === 0) {
      this.err("No IEXEC_OUT!");
    }
    const valueMatrix = [
      [2.11, 2.20, 2.52, 2.75],
      [2.2, 2.44, 2.44, 2.80],
      [2.4, 2.2, 2.4, 2.4],
      [2.15, null, 2.82, 2.99],
      [2.14, 2.1, 2.3, 2.67],
      [null, 2.66, 2.33, 2.71],
      [3.14, 2.1, 0.3, 2.99],
      [2.1, 2.33, 2.99, 2.71],
    ];
    const sources = new Array<NumberSourceValues>();
    for (let x = 0; x < valueMatrix.length; x++) {
        sources.push(new NumberSourceValues(new MockSourceNumb("Source_" + x, x, valueMatrix[x])))
    }

    run_test(sources,(result)=>{
      console.log("############## Consensus result ##############");
      console.log(result.toString());
      console.log("##############################################");
      //###########################Ecode result
      var callback_data = result.getEncodedValue(new EncoderManual());
  
      //###########################Write result
      const computedJsonObj = {
        'callback-data': callback_data
      };
  
      console.log("computedJsonObj", computedJsonObj);
      if (this.cb !== undefined) {
        this.cb(computedJsonObj);
      } else {
        fsPromises.writeFile(
          `${this.iexecOut}/computed.json`,
          JSON.stringify(computedJsonObj),
        );
      }
    });
  
  }

  setCB(cb: (ris: any) => void): void {
    this.cb = cb;
  }
}




