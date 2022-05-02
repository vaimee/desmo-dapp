import { promises as fsPromises } from 'fs';
import QueryParser from "./QueryParser";
import IWorker from "./IWorker";
import DirectoriesCollector from "./DirectoriesCollector";
import { collect, consensus } from "./consensus/dataCollector";

import EncoderManual from "./encoder/EncoderManual";

import ISourceValues from "../model/ISourceValues";
import StringSourceValues from "../model/StringSourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";
import ISource from '../model/ISource';


export default class Worker implements IWorker {

  collector: DirectoriesCollector;

  constructor() {
    this.collector = new DirectoriesCollector();
  }

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
    if (!parser.isValid()) {
      this.err("Query not valid!");
    } else if (directoriesList.length < 4 || directoriesList.length % 4 !== 0) {
      this.err("Directories list must be multipler of 4 and at least 4.");
    } else {
      (async () => {
        try {
          const iexecOut = process.env.IEXEC_OUT;
          await this.collector.init();
          //###########################Retrieve values
          this.collector.collectDirs(directoriesList, parser, (sources: Map<number, Array<ISource>>) => {

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
            //console.log("sourceValues",sourceValues);
            collect(sourceValues,
              async (s) => {

                //###########################Compute result
                try {
                    console.log("--------<>-------");
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

                    console.log("computedJsonObj", computedJsonObj);

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
}




