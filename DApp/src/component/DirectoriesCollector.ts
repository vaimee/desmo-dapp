
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import WotSource from "../model/WotSource";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription, ConsumedThing } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';
import Config from "../const/Config";
import IDirectoriesCollector from "./IDirectoriesCollector";
import { InteractionOutput } from "wot-typescript-definitions";



const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";

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

    async resolveTD(td: any,prop:string): Promise<InteractionOutput | null> {
        if(this.wot===undefined){
            console.error("ResolveTD error: wot is still undefined!");
            return null;
        }else{
            try {
                //return await this.wot.consume(td as ThingDescription);
                //console.info("========== START");
                const thing = await this.wot.consume(td as ThingDescription);
                //console.info("========== END");
                return await thing.readProperty(prop);
            } catch (err) {
                console.error("ResolveTD error:", err);
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
                    this.resolveTD(tds[x],propName)
                        .then((reader) => {
                            if (!abort) {
                                if (reader !== null) {
                                    ris.push(new WotSource(reader,index));
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
                        })
                        .catch((err) => {
                            console.error("ConvertToISourceArr error:", err);
                            //here we can exstract a url for the VoidSource from tds[x]
                            //but this is not important, for now the url of the VoidSource is void ""
                            if (Config.IGNORE_TD_COLLECTION_ERROR) {
                                ris.push(new VoidSource("", index));
                                hit++;
                                //console.log("@@@@@BARIER "+hit+"/"+barier);//ok
                                if (hit >= barier) {
                                    cb(ris);
                                }
                            } else {
                                returnVoidSource();
                            }
                        });
                }
            }
        }
        
    }

    getThingFromDir (dir: string, dirIndex: number, parser: IQueryParser, cb: (s: Array<ISource>) => void) {

        let jsonpath = parser.getJsonPath();
        //console.log("getPrefixList-->",parser.getPrefixList());
        //parser.resolvePrefix("qudt:DEG_C");
    
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        //          HERE THE CODE to pass query params (json-path, geo, time ...) to the Directory
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
    
        let request_path = dir + path_getAll;
        if (jsonpath !== null) {
            request_path = dir + path_jsonPathQuery + jsonpath;
        }
        //console.log("request_path",request_path); //ok
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
            source.cancel();
            // Timeout Logic
        }, Config.DIRECTORY_TIME_OUT);
        //console.log("HIT---->C0",request_path);//ok
        axios.get(request_path,{cancelToken: source.token})
            .then((ris) => { 
                //console.log(ris.status,request_path);//ok
                clearTimeout(timeout);
                if (ris.status === 200) {
                    //console.log("HIT---->C1",request_path);//ok
                    //console.log(request_path, ris.data);
                    const json_to_filter = ris.data;
                    this.resolveToISourceArr(
                        json_to_filter,
                        parser,
                        dirIndex,
                        cb
                    )
                } else {
                    //console.log("HIT---->C2");//ok
                    const noTDs = new Array<ISource>();
                    noTDs.push(new VoidSource(dir, dirIndex));
                    cb(noTDs);
                }
            })
            .catch((error)=> {
                //console.log("HIT---->C3");//ok
                //console.log(request_path);
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
                console.log("Pre punished source: "+countPunishedSource+ "/"+count);
                cb(ris);
            }
        }
        if(sources.length===0){
            cb(ris);//this never gonna happen
        }else{
            for (let s=0;s<sources.length;s++) {
                //console.log("s---->"+s);
                const realDirURL = Directories[sources[s]];
                const indexDir = sources[s];
                if ( realDirURL !== undefined) {
                    //console.log("A_HIT---->"+realDirURL);
                    this.getThingFromDir(realDirURL, indexDir, parser, (tds: Array<ISource>) => {
                        ris.set(indexDir, tds);
                        //console.log("B_HIT---->"+s);
                        hit();
                    });
                } else {
                    const noTDs = new Array<ISource>();
                    noTDs.push(new VoidSource(realDirURL, indexDir));
                    ris.set(indexDir, noTDs);
                    console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
                    //console.log("HIT---->"+s);
                    hit();
                }
            }
        }
        
    }
    
}