import { promises as fsPromises } from 'fs';
import QueryParser from "./QueryParser";
import IWorker from "./IWorker";
import { collectDirs } from "./directoriesCollector";
import { collect, consensus } from "./consensus/dataCollector";

import EncoderManual from "./encoder/EncoderManual";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";


export default class Worker implements IWorker {

  constructor() { }

  err(err: string): void {
    console.log("ERROR: " + err);
    process.exit(1);
  }

  work(query: string, directoriesList: Array<number>): void {
    const parser = new QueryParser(query);
    try {
      parser.parse();
    } catch (e: any) {
      this.err(e.message);
    }
    if (parser.isValid()) {
      this.err("Query not valid!");
    } else if (directoriesList.length < 4 || directoriesList.length % 4 !== 0) {
      this.err("Directories list must be multipler of 4 and at least 4.");
    } else {
      (async () => {
        try {
          const iexecOut = process.env.IEXEC_OUT;

          //###########################Retrieve values
          const sources = collectDirs(directoriesList,parser);
          var sourceValues = new Array<ISourceValues>();
          for (var x in sources) {
            if (parser.isAskingForNumber()) {
                sourceValues.push(new NumberSourceValues(sources[x]));
            } else if (parser.isAskingForString()) {
                sourceValues.push(new StringSourceValues(sources[x]));
            } else if (parser.isAskingForBoolean()) {
              sourceValues.push(new BoolSourceValues(sources[x]));
            } else {
              this.err("Result Type of the request unknow!");
              // break; //no need, this.err will exit 
            }
          }


          collect(sourceValues,
            async (s) => {

              //###########################Compute result
              const result = consensus(s);

              //###########################Ecode result
              var callback_data = result.getEncodedValue(new EncoderManual());

              //###########################Write result
              const computedJsonObj = {
                'callback-data': callback_data
              };

              await fsPromises.writeFile(
                `${iexecOut}/computed.json`,
                JSON.stringify(computedJsonObj),
              );

              console.log("computedJsonObj", computedJsonObj)
            }
          );




        } catch (e: any) {
          this.err(e.message);
        }
      })();
    }
  }
}




