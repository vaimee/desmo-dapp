
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import Source from "../model/Source";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
import axios from "axios";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';

// const servient = new Servient();
// servient.addClientFactory(new HttpClientFactory(null));
// const WoTHelpers = new Helpers(servient);
// servient.start().then( (WoT) => {
    
//     axios.get("http://localhost:8080/temp_02")
//     .then(async (ris) => {
//         if (ris.status === 200) {
//            let thing = await WoT.consume(ris.data);  
//            console.log("RIS-->",thing.getClients());
//         } else {

//             console.log("err-->",ris.status);
//         }
//     })
//     .catch(function (error) {

//         console.log("err-->",error);
//     });

// });

const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/thing";
//###########GET EXAMPLE
// axios.get(url)
// .then((ris) => {
//     if (ris.status === 200) {
//        ris.data
//     } else {

//     }
// })
// .catch(function (error) {
// });

//###########POST EXAMPLE
// axios.post(
//     url,
//     jsonstr,
//     _headers
//   )

const filterDirDynamicFilter = function (tds: [any], parser: IQueryParser): [any] {
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    return tds;
}

const filterDirGeoFilter = function (tds: [any], parser: IQueryParser): [any] {
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    return tds;
}

const filterTimeFilter = function (tds: [any], parser: IQueryParser): [any] {
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    //################ NOT IMPLEMENTED YET
    return tds;
}

const convertToISourceArr = function (tds: [any]): Array<ISource> {
    //################ WIP
    //################ WIP
    //################ WIP
    console.log(tds,tds);
    const allowProtocols = ["http://","https://"];
    for(let x=0;x<tds.length;x++){
        if(tds[x].href!==undefined){
            var protoPass = false;
            //####################WIP<<<<
            //####################WIP<<<<
            //####################WIP<<<<
            for(let y in allowProtocols){
                if(tds[x].href.toString().startWith(allowProtocols[y])){
                    console.log("----->"+tds[x].href)
                    protoPass=true;
                    break;
                }
            }

        }
    }
    const ris = new Array<ISource>();
    return ris;
}

const getThingFromDir = function (dir: string, dirIndex: number, parser: IQueryParser, cb: (s: Array<ISource>) => void) {

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
                cb(
                    convertToISourceArr(
                        filterTimeFilter(
                            filterDirGeoFilter(
                                filterDirDynamicFilter(json_to_filter, parser)
                            , parser)
                        , parser)
                    )
                );
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


export function collectDirs(
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
            getThingFromDir(Directories[sources[s]], sources[s], parser, (tds: Array<ISource>) => {
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



