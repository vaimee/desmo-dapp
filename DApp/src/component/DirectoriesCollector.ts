import ISource from "../model/ISource";
import WotSource from "../model/WotSource";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription, ConsumedThing } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory, HttpsClientFactory } from '@node-wot/binding-http';
import Config from "../const/Config";
import IDirectoriesCollector from "./IDirectoriesCollector";
import Logger from "./Logger";

const componentName = "DirectoriCollector";


const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";

export default class DirectoriesCollector implements IDirectoriesCollector{

    WoThelpers:Helpers;
    servient:Servient;
    wot?:typeof WoT;

    constructor(){
        this.servient = new Servient();
        this.servient.addClientFactory(new HttpClientFactory(undefined));
        this.servient.addClientFactory(new HttpsClientFactory(undefined));
        this.WoThelpers = new Helpers(this.servient);
    }

    async init():Promise<void>{
        this.servient.start().then( (WoT) => {
            this.wot = WoT;
        })
    }

    //for retrieve the TD from the url of the TD
    // resolveTDUrl (url: string, cbOk: (td: any) => void, okErr: () => void):void {
    //     this.WoThelpers.fetch(url)
    //         .then(cbOk)
    //         .catch((err) => {
    //             console.error("ResolveTD Fetch error:", err);
    //             okErr();
    //         });
    // }

    async resolveTD(td: any): Promise<ConsumedThing | null> {
        if(this.wot===undefined){
            Logger.getInstance().addLog(componentName,"ResolveTD error: wot is still undefined!",true);
            return null;
        }else{
            try {
                //return await this.wot.consume(td as ThingDescription);
                //console.info("========== START");
                const thing = await this.wot.consume(td as ThingDescription);
                //console.info("========== END");
                return thing;
            } catch (err) {
                Logger.getInstance().addLog(componentName,"ResolveTD error: "+ err,true);
                return null;
            }
        }
    }

    

    resolveToISourceArr (tds: []|[any], parser: IQueryParser, index: number, cb: (r: Array<ISource>) => void): void {
        // console.log(tds,tds);
        const ris = new Array<ISource>();
        const barier = tds.length;
        var hit = 0;
        var abort = false;
        const propName = parser.getPropertyIdentifier();

        //void source
        const returnVoidSource=()=>{
            abort = true;
            const voidRis = new Array<ISource>();
            voidRis.push(new VoidSource("", index));
            //console.log("@@@@@BARIER FORCE VOID"); //ok
            cb(voidRis);
        }
        
        //console.log("tds.length",tds.length);
        if(barier===0){
            returnVoidSource();
        }else{
            for (let x = 0; x < tds.length; x++) {
                if (!abort) {//NOT SO USEFULL HERE
                    this.resolveTD(tds[x])
                        .then((reader) => {
                            if (!abort) {
                                if (reader !== null) {
                                    ris.push(new WotSource(reader,propName,index));
                                    hit++;
                                    //console.log("@@@@@BARIER "+hit+"/"+barier);//ok
                                    if (hit >= barier) {
                                        cb(ris);
                                    }
                                } else if (Config.IGNORE_TD_COLLECTION_ERROR) {
                                    ris.push(new VoidSource("", index));
                                    hit++;
                                    //console.log("@@@@@BARIER "+hit+"/"+barier);//ok
                                    if (hit >= barier) {
                                        cb(ris);
                                    }
                                } else {
                                    returnVoidSource();
                                }
                            }
                        }).catch((err)=>{
                            Logger.getInstance().addLog(componentName,"ResolveTD resolveToISourceArr error: "+ err,true);
                        })
                        // .catch((err) => {
                        //     console.error("ConvertToISourceArr error:", err);
                        //     //here we can exstract a url for the VoidSource from tds[x]
                        //     //but this is not important, for now the url of the VoidSource is void ""
                        //     if (Config.IGNORE_TD_COLLECTION_ERROR) {
                        //         ris.push(new VoidSource("", index));
                        //         hit++;
                        //         //console.log("@@@@@BARIER "+hit+"/"+barier);//ok
                        //         if (hit >= barier) {
                        //             cb(ris);
                        //         }
                        //     } else {
                        //         returnVoidSource();
                        //     }
                        // });
                }
            }
        }
        
    }

    getThingFromDir (dir: string, dirIndex: number, parser: IQueryParser, cb: (s: Array<ISource>) => void) {

        const jsonpath = parser.getJsonPath();
        //console.log("getPrefixList-->",parser.getPrefixList());
        //parser.resolvePrefix("qudt:DEG_C");
    
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        //          HERE THE CODE to pass query params (json-path, geo, time ...) to the Directory
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
    
        var request_path = dir + path_getAll;
        if (jsonpath !== null) {
            request_path = dir + path_jsonPathQuery + encodeURIComponent(jsonpath);
        }
        Logger.getInstance().addLog(componentName,"request_path: "+request_path);
        axios.get(request_path)
            .then((ris) => {
                if (ris.status === 200) {
                    //console.log("HIT---->C");//ok
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
                //console.log(request_path);
                Logger.getInstance().addLog(componentName,'DirectoriesCollector error on Directory index:' + dirIndex + " Error: " + error,true);
                const noTDs = new Array<ISource>();
                noTDs.push(new VoidSource(dir, dirIndex));
                cb(noTDs);
            });
    }

    collectDirs(
        sources: Array<string>,
        parser: IQueryParser,
        cb: (resolvedSources: Map<string, Array<ISource>>) => void
    ): void {
    
        //console.log("parser",parser);
        const ris = new Map<string, Array<ISource>>();
        var barrier = 0;
        const count = sources.length;
        const hit = () => {
            barrier++;
            //console.log("barrier",barrier);
            //console.log("count",count);
            if (barrier >= count) {
                //console.log("ris",ris);
                var countPunishedSource =0;
                for(let key of ris.keys()){
                    const iSources = ris.get(key);
                    if(iSources===undefined || iSources.length===0){
                        countPunishedSource++;
                    }else{
                        for(let ss =0;ss<iSources.length;ss++){
                            if(iSources[ss].isPunished()){
                                countPunishedSource++;
                                break;
                            }
                        }
                    }
                }
                Logger.getInstance().addLog(componentName,"Pre punished source: "+countPunishedSource+ "/"+count);
                //console.log("collectDirs.ris: ",ris);
                cb(ris);
            }
        }
        for (let s=0;s<sources.length;s++) {
            //console.log("s---->"+s);
            const realDirURL = sources[s];
            const indexDir = s;
            if ( realDirURL !== undefined) {
                //console.log("A_HIT---->"+s);
                this.getThingFromDir(realDirURL, indexDir, parser, (tds: Array<ISource>) => {
                    ris.set(s+"_"+realDirURL, tds);
                    //console.log("B_HIT---->"+s);
                    hit();
                });
            } else {
                const noTDs = new Array<ISource>();
                noTDs.push(new VoidSource(realDirURL, indexDir));
                ris.set(s+"_"+realDirURL, noTDs);
                Logger.getInstance().addLog(componentName,'DirectoriesCollector miss a Directory for index:' + sources[s]);
                //console.log("HIT---->"+s);
                hit();
            }
        }
    }
    
}