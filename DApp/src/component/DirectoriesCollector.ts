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

    async resolveTD(td: any): Promise<ConsumedThing | null> {
        if(this.wot===undefined){
            Logger.getInstance().addLog(componentName,"ResolveTD error: wot is still undefined!",true);
            return null;
        }else{
            try {
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

    

    async resolveToISourceArr (
        tds: []|[any], 
        parser: IQueryParser, 
        index: number, 
    ): Promise<Array<ISource>> {
        // console.log(tds,tds);
        const ris = new Array<ISource>();
        const propName = parser.getPropertyIdentifier();
        
        //in case of fail, the returned Source is always a VoidSource
        const voidRis = new Array<ISource>();
        voidRis.push(new VoidSource("", index));

        if(tds.length===0){
            return voidRis;
        }     
        for (let x = 0; x < tds.length; x++) {
            try{
                const reader = await this.resolveTD(tds[x]);
                if (reader !== null) {
                    ///////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////
                    //HERE THE CODE filter with other query paramter (filters that are not covered from the TDD)
                    ////////////////////////////////////////////////////////
                    ////////////////////////////////////////////////////////
                    const ws = new WotSource(reader,propName,index);
                    const geoFilter = parser.getGeoFilter();
                    if(geoFilter===null || await ws.isGeoValid(geoFilter)){
                        ris.push(ws);
                    }else{
                       const vs= new VoidSource("", index);
                       vs.setScore(1);//geo filter not passed!
                       ris.push(vs);
                       Logger.getInstance().addLog(componentName,"GeoFilter not passed for source"+index);
                    }
                } else if (Config.IGNORE_TD_COLLECTION_ERROR) {
                    ris.push(new VoidSource("", index));
                } else {
                    return voidRis;
                }
            }catch(err){
                if(err instanceof Error){
                    Logger.getInstance().addLog(componentName,"ResolveTD resolveToISourceArr error: "+ err.message,true);
                }else{
                    Logger.getInstance().addLog(componentName,"ResolveTD resolveToISourceArr error: "+ err,true);
                }
            }
        }
        return ris;
    }

    async getThingFromDir (
        dir: string, 
        dirIndex: number, 
        parser: IQueryParser,
    ) :Promise<Array<ISource>>{

        const jsonpath = parser.getJsonPath();

        var request_path = dir + path_getAll;
        if (jsonpath !== null) {
            request_path = dir + path_jsonPathQuery + encodeURIComponent(jsonpath);
        }
        Logger.getInstance().addLog(componentName,"request_path: "+request_path);
        try{
            const ris = await axios.get(request_path);
            if (ris.status === 200) {
                //console.log("HIT---->C");//ok
                //console.log(request_path, ris.data);
                const json_to_filter = ris.data;
                return this.resolveToISourceArr(
                    json_to_filter,
                    parser,
                    dirIndex,
                )
            }
        }catch(error){
            if(error instanceof Error){
                Logger.getInstance().addLog(componentName,'DirectoriesCollector error on Directory index:' + dirIndex + " Error: " + error.message,true);
            }else{
                Logger.getInstance().addLog(componentName,'DirectoriesCollector error on Directory index' + dirIndex,true);
            }
        }
        const noTDs = new Array<ISource>();
        noTDs.push(new VoidSource(dir, dirIndex));
        return noTDs;
    }

    async collectDirs(
        sources: Array<string>,
        parser: IQueryParser,
    ): Promise<Map<string, Array<ISource>>> {
        const ris = new Map<string, Array<ISource>>();
        const count = sources.length;
        for (let s=0;s<sources.length;s++) {
            const realDirURL = sources[s];
            const indexDir = s;
            if ( realDirURL !== undefined) {
                const tds = await this.getThingFromDir(realDirURL, indexDir, parser);
                ris.set(s+"_"+realDirURL, tds);
            } else {
                const noTDs = new Array<ISource>();
                noTDs.push(new VoidSource(realDirURL, indexDir));
                ris.set(s+"_"+realDirURL, noTDs);
                Logger.getInstance().addLog(componentName,'DirectoriesCollector miss a Directory for index:' + sources[s]);
            }
        }
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
        return ris;
    }
    
}