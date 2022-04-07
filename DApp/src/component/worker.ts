import { promises as fsPromises } from 'fs';
import QueryParser from "./queryParser";
import { collectDirs } from "./directoriesCollector";
import { collect, consensus } from "./dataCollector";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";

//##################################WIP
//##################################WIP
//##################################WIP

export default class Worker {

  constructor() { }

  err(err: string): void {
    console.log("ERROR: " + err);
    process.exit(1);
  }

  work(query: string, directoryesList: Array<number>): void {
    const parser = new QueryParser(query);
    try {
      parser.parse();
    } catch (e: any) {
      this.err(e.message);
    }
    if (parser.isValid()) {
      this.err("Query not valid!");
    } else if (directoryesList.length < 4 || directoryesList.length % 4 !== 0) {

      this.err("Directories list must be multipler of 4 and at least 4.");
    } else {
      (async () => {
        try {
          const iexecOut = process.env.IEXEC_OUT;

          //###########################Retrieve values
          const sources = collectDirs(directoryesList);
          var sourceValues = new Array<ISourceValues>();
          if (parser.isAskingForNumber()) {
            for (var x in sources) {
              sourceValues.push(new NumberSourceValues(sources[x]));
            }
          } else if (parser.isAskingForString()) {
            for (var x in sources) {
              sourceValues.push(new StringSourceValues(sources[x]));
            }
          } else {
            this.err("Result Type of the request unknow!");
          }

          collect(sourceValues,
            async (s) => {

              //###########################Compute result
              const result = consensus(s);
             
              //###########################Ecode result
              var callback_data =  result.getEncodedValue();

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




