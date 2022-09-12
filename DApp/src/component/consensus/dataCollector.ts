import ISourceValues from "../../model/ISourceValues";
import NumberSourceValues from "../../model/NumberSourceValues";
import StringSourceValues from "../../model/StringSourceValues";
import BoolSourceValues from "../../model/BoolSourceValues";
import consensusForNumber from "./consensusForNumber";
import consensusForString from "./consensusForString";
import consensusForBool from "./consensusForBool";
import Result from "../../model/Result";
import Conf from "../../const/Config";
import Logger from "../Logger";
import {ValueType} from "../../const/ValueType";

const componentName = "DataCollector";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export function consensus(sources : Array<ISourceValues>): Result {
    if(sources[0] instanceof NumberSourceValues){
        return new Result(
            consensusForNumber(sources as Array<NumberSourceValues>).toString(),
            ValueType.TYPE_NUMBER,
            sources
        );
    }else if(sources[0] instanceof StringSourceValues){
        return new Result(
            consensusForString(sources as Array<StringSourceValues>),
            ValueType.TYPE_STRING,
            sources
        );
    }else if(sources[0] instanceof BoolSourceValues){
        return new Result(
            consensusForBool(sources as Array<BoolSourceValues>).toString(),
            ValueType.TYPE_BOOLEAN,
            sources
        );
    }else{
        Logger.getInstance().addLog(componentName,"SourcesValue type not found for: "+ sources[0].constructor.name,true);
        throw new Error("SourcesValue type not found for: "+ sources[0].constructor.name);
    }
}

export async function collect(
    sources : Array<ISourceValues>
):Promise<Array<ISourceValues>> {
    const notAborted = new Set<number>();
    Logger.getInstance().addLog(componentName,"collect started!");

    for(var s in sources){
        const index = sources[s].getSource().getIndex();
        notAborted.add(index);
    }

    var countRequest=0;
    const recursive = async function():Promise<Array<ISourceValues>>{
        countRequest++;
        if(countRequest>Conf.AUTOCORRELATION){
            //punish all the sources of the same Directory
            // that has at least one Source already punished
            for(var s in sources){
                const  index = sources[s].getSource().getIndex();
                if(!notAborted.has(index)){
                    sources[s].getSource().punish();
                }
            }
            //console.log("DataCollectorOutput: ", sources); //ok
            return sources;
        }else{  
            //console.log("recursive CALL"); //ok
            const needPunishment = new Array<number>();
            //console.log("notAborted",notAborted);
            //console.log("notAborted.size",notAborted.size);//ok
            const promiseArray= new Array<Promise<boolean>>();
            const keyArray= new Array<number>();
            for(let s=0;s<sources.length;s++){
                const actualSource= sources[s];
                const key =actualSource.getSource().getIndex();
                //console.log("notAborted.has("+key+"):"+notAborted.has(key)); //ok
                if(notAborted.has(key)){
                    const handleError = async function name():Promise<boolean> {
                        try{
                            return await actualSource.addTemporalValue();
                        }catch(err){
                            if(err instanceof Error){
                                Logger.getInstance().addLog(componentName,"Source["+key+"] ask, ERROR: "+ err.message);
                            }else{
                                Logger.getInstance().addLog(componentName,"Source["+key+"] ask, ERROR: "+ err);
                            }
                        }
                        needPunishment.push(key);
                        return false;
                    }
                    promiseArray.push(handleError());
                    keyArray.push(key);
                }
            }
            const risArray = await Promise.all(promiseArray);
            for(let x=0;x<keyArray.length;x++){
                if(!risArray[x]){
                    const key =keyArray[x];
                    needPunishment.push(key);
                    Logger.getInstance().addLog(componentName,"Source["+key+"] ask, received not valid value.");
                }
            }
            for(var x in needPunishment){
                const key= needPunishment[x];
                if(notAborted.has(key)){
                  notAborted.delete(key);
                }
            }
            await delay(Conf.T);
            return await recursive();
        }
    }

    await delay(Conf.T);
    return await recursive();
}