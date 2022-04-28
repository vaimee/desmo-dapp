
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import WotSource from "../model/WotSource";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription, InteractionOutput } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';
import Config from "../const/Config";
import IDirectoriesCollector from "./IDirectoriesCollector";


const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/thing";
// let WoThelpers: Helpers;
// //for retrieve the TD from the url of the TD
// const resolveTDUrl = function (url: string, cbOk: (td: any) => void, okErr: () => void) {
//     WoThelpers.fetch(url)
//         .then(cbOk)
//         .catch((err) => {
//             console.error("ResolveTD Fetch error:", err);
//             okErr();
//         });
// }

// const resolveTD = async function (td: any, propertyName: string): Promise<InteractionOutput | null> {
//     try {
//         const thing = await WoT.consume(td as ThingDescription);
//         // console.info("=== TD ===");
//         // console.info(td);
//         // console.info("==========");

//         return await thing.readProperty(propertyName);
//     } catch (err) {
//         console.error("ResolveTD error:", err);
//         return null;
//     }
// }


// const filterDirDynamicFilter = function (tds: [any], parser: IQueryParser): [any] {
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     return tds;
// }

// const filterDirGeoFilter = function (tds: [any], parser: IQueryParser): [any] {
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     return tds;
// }

// const filterTimeFilter = function (tds: [any], parser: IQueryParser): [any] {
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     //################ NOT IMPLEMENTED YET
//     return tds;
// }

// const convertToISourceArr = function (tds: [any], parser: IQueryParser, index: number, cb: (r: Array<ISource>) => void): void {
//     //################ WIP
//     //################ WIP
//     //################ WIP
//     // console.log(tds,tds);
//     const ris = new Array<ISource>();
//     const barier = tds.length;
//     var hit = 0;
//     var abort = false;
//     for (let x = 0; x < tds.length; x++) {
//         if (!abort) {//NOT SO USEFULL HERE
//             resolveTD(tds[x], parser.getPropertyIdentifier())
//                 .then((reader) => {
//                     if (!abort) {
//                         if (reader !== null) {
//                             ris.push(new WotSource(reader, index));
//                             hit++;
//                             if (hit >= barier) {
//                                 cb(ris);
//                             }
//                         } else if (Config.IGNORE_TD_COLLECTION_ERROR) {
//                             ris.push(new VoidSource("", index));
//                             hit++;
//                             if (hit >= barier) {
//                                 cb(ris);
//                             }
//                         } else {
//                             abort = true;
//                             const voidRis = new Array<ISource>();
//                             voidRis.push(new VoidSource("", index));
//                             cb(voidRis);
//                         }

//                     }
//                 })
//                 .catch((err) => {
//                     console.error("ConvertToISourceArr error:", err);
//                     //here we can exstract a url for the VoidSource from tds[x]
//                     //but this is not important, for now the url of the VoidSource is void ""
//                     const voidSource = new VoidSource("", index);
//                     if (Config.IGNORE_TD_COLLECTION_ERROR) {
//                         ris.push(voidSource);
//                         hit++;
//                         if (hit >= barier) {
//                             cb(ris);
//                         }
//                     } else {
//                         abort = true;
//                         const voidRis = new Array<ISource>();
//                         voidRis.push(voidSource);
//                         cb(voidRis);
//                     }
//                 });
//         }
//     }
// }

// const getThingFromDir = function (dir: string, dirIndex: number, parser: IQueryParser, cb: (s: Array<ISource>) => void) {

//     const jsonpath = parser.getJsonPath();
//     //console.log("getPrefixList-->",parser.getPrefixList());
//     //parser.resolvePrefix("qudt:DEG_C");


//     var request_path = dir + path_getAll;
//     if (jsonpath !== null) {
//         request_path = dir + path_jsonPathQuery + jsonpath;
//     }

//     axios.get(request_path)
//         .then((ris) => {
//             if (ris.status === 200) {
//                 //console.log(request_path, ris.data);
//                 const json_to_filter = ris.data;
//                 convertToISourceArr(
//                     filterTimeFilter(
//                         filterDirGeoFilter(
//                             filterDirDynamicFilter(json_to_filter, parser)
//                             , parser)
//                         , parser),
//                     parser,
//                     dirIndex,
//                     cb
//                 )
//             } else {
//                 const noTDs = new Array<ISource>();
//                 noTDs.push(new VoidSource(dir, dirIndex));
//                 cb(noTDs);
//             }
//         })
//         .catch(function (error) {
//             console.log(request_path);
//             console.log('DirectoriesCollector error on Directory index:' + dirIndex + " Error: " + error);
//             const noTDs = new Array<ISource>();
//             noTDs.push(new VoidSource(dir, dirIndex));
//             cb(noTDs);
//         });
// }


// export function collectDirs(
//     sources: Array<number>,
//     parser: IQueryParser,
//     cb: (resolvedSources: Map<number, Array<ISource>>) => void
// ): void {

//     //console.log("parser",parser);
//     const ris = new Map<number, Array<ISource>>();
//     var barrier = 0;
//     const count = sources.length;
//     const hit = () => {
//         barrier++;
//         if (barrier >= count - 1) {
//             cb(ris);
//         }
//     }
//     for (var s in sources) {
//         if (Directories[sources[s]] !== undefined) {
//             getThingFromDir(Directories[sources[s]], sources[s], parser, (tds: Array<ISource>) => {
//                 ris.set(sources[s], tds);
//                 hit();
//             });
//         } else {
//             const noTDs = new Array<ISource>();
//             noTDs.push(new VoidSource(Directories[sources[s]], sources[s]));
//             ris.set(sources[s], noTDs);
//             console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
//             hit();
//         }
//     }
// }




export default class DirectoriesCollector implements IDirectoriesCollector{

    WoThelpers:Helpers;
    servient:Servient;
    wot?:typeof WoT;

    constructor(){
        this.servient = new Servient();
        this.servient.addClientFactory(new HttpClientFactory(undefined));
        this.WoThelpers = new Helpers(this.servient);
    }

    async init():Promise<void>{
        this.servient.start().then( (WoT) => {
            this.wot = WoT;
        })
    }

    //for retrieve the TD from the url of the TD
    resolveTDUrl (url: string, cbOk: (td: any) => void, okErr: () => void):void {
        this.WoThelpers.fetch(url)
            .then(cbOk)
            .catch((err) => {
                console.error("ResolveTD Fetch error:", err);
                okErr();
            });
    }

    async resolveTD(td: any, propertyName: string): Promise<InteractionOutput | null> {
        if(this.wot===undefined){
            console.error("ResolveTD error: wot is still undefined!");
            return null;
        }else{
            try {
                const thing = await this.wot.consume(td as ThingDescription);
                // console.info("=== TD ===");
                // console.info(td);
                // console.info("==========");
    
                return await thing.readProperty(propertyName);
            } catch (err) {
                console.error("ResolveTD error:", err);
                return null;
            }
        }
    }


    resolveToISourceArr (tds: [any], parser: IQueryParser, index: number, cb: (r: Array<ISource>) => void): void {
        //################ WIP
        //################ WIP
        //################ WIP
        // console.log(tds,tds);
        const ris = new Array<ISource>();
        const barier = tds.length;
        var hit = 0;
        var abort = false;
        for (let x = 0; x < tds.length; x++) {
            if (!abort) {//NOT SO USEFULL HERE
                this.resolveTD(tds[x], parser.getPropertyIdentifier())
                    .then((reader) => {
                        if (!abort) {
                            if (reader !== null) {
                                ris.push(new WotSource(reader, index));
                                hit++;
                                if (hit >= barier) {
                                    cb(ris);
                                }
                            } else if (Config.IGNORE_TD_COLLECTION_ERROR) {
                                ris.push(new VoidSource("", index));
                                hit++;
                                if (hit >= barier) {
                                    cb(ris);
                                }
                            } else {
                                abort = true;
                                const voidRis = new Array<ISource>();
                                voidRis.push(new VoidSource("", index));
                                cb(voidRis);
                            }
    
                        }
                    })
                    .catch((err) => {
                        console.error("ConvertToISourceArr error:", err);
                        //here we can exstract a url for the VoidSource from tds[x]
                        //but this is not important, for now the url of the VoidSource is void ""
                        const voidSource = new VoidSource("", index);
                        if (Config.IGNORE_TD_COLLECTION_ERROR) {
                            ris.push(voidSource);
                            hit++;
                            if (hit >= barier) {
                                cb(ris);
                            }
                        } else {
                            abort = true;
                            const voidRis = new Array<ISource>();
                            voidRis.push(voidSource);
                            cb(voidRis);
                        }
                    });
            }
        }
    }

    getThingFromDir (dir: string, dirIndex: number, parser: IQueryParser, cb: (s: Array<ISource>) => void) {

        const jsonpath = parser.getJsonPath();
        //console.log("getPrefixList-->",parser.getPrefixList());
        //parser.resolvePrefix("qudt:DEG_C");
    
    
        var request_path = dir + path_getAll;
        if (jsonpath !== null) {
            request_path = dir + path_jsonPathQuery + jsonpath;
        }
    
        axios.get(request_path)
            .then((ris) => {
                if (ris.status === 200) {
                    //console.log(request_path, ris.data);
                    const json_to_filter = ris.data;
                    this.resolveToISourceArr(
                        json_to_filter,
                        parser,
                        dirIndex,
                        cb
                    )
                } else {
                    const noTDs = new Array<ISource>();
                    noTDs.push(new VoidSource(dir, dirIndex));
                    cb(noTDs);
                }
            })
            .catch(function (error) {
                console.log(request_path);
                console.log('DirectoriesCollector error on Directory index:' + dirIndex + " Error: " + error);
                const noTDs = new Array<ISource>();
                noTDs.push(new VoidSource(dir, dirIndex));
                cb(noTDs);
            });
    }

    collectDirs(
        sources: Array<number>,
        parser: IQueryParser,
        cb: (resolvedSources: Map<number, Array<ISource>>) => void
    ): void {
    
        //console.log("parser",parser);
        const ris = new Map<number, Array<ISource>>();
        var barrier = 0;
        const count = sources.length;
        const hit = () => {
            barrier++;
            if (barrier >= count - 1) {
                cb(ris);
            }
        }
        for (var s in sources) {
            if (Directories[sources[s]] !== undefined) {
                this.getThingFromDir(Directories[sources[s]], sources[s], parser, (tds: Array<ISource>) => {
                    ris.set(sources[s], tds);
                    hit();
                });
            } else {
                const noTDs = new Array<ISource>();
                noTDs.push(new VoidSource(Directories[sources[s]], sources[s]));
                ris.set(sources[s], noTDs);
                console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
                hit();
            }
        }
    }
    
}