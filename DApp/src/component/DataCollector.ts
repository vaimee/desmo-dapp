import ISourceValues from "../model/ISourceValues";
import NumberSourceValues from "../model/NumberSourceValues";
import StringSourceValues from "../model/StringSourceValues";
import BoolSourceValues from "../model/BoolSourceValues";
import consensusForNumber from "./consensusForNumber";
import consensusForString from "./consensusForString";
import consensusForBool from "./consensusForBool";
import Result from "../model/Result";
import Conf from "../const/Config";
import Types from "../const/Types";

export function consensus(sources : Array<ISourceValues>): Result {
    if(sources[0] instanceof NumberSourceValues){
        return new Result(
            consensusForNumber(sources as Array<NumberSourceValues>).toString(),
            Types.TYPE_NUMBER,
            sources
        );
    }else if(sources[0] instanceof StringSourceValues){
        return new Result(
            consensusForString(sources as Array<StringSourceValues>),
            Types.TYPE_STRING,
            sources
        );
    }else if(sources[0] instanceof BoolSourceValues){
        return new Result(
            consensusForBool(sources as Array<BoolSourceValues>),
            Types.TYPE_BOOLEAN,
            sources
        );
    }else{
        throw new Error("SourcesValue type not found for: "+ sources[0].constructor.name);
    }
}

export function collect(
    sources : Array<ISourceValues>,
    cb:(s : Array<ISourceValues>)=>void
):void {
    
    const notAborted = new Map<string,ISourceValues>();
    const askTo=(cbSYnc:(np:Array<string>)=>void)=>{
        // const keys= notAborted.keys();
        const needPunishment = new Array<string>();
        var barier=0;
        const sourcesCount = notAborted.size;
        // console.log("notAborted",notAborted);
        // console.log("notAborted.size",notAborted.size);
        notAborted.forEach((actualSource: ISourceValues, key: string) => {
            // console.log("key",key);
            actualSource.addTemporalValue()
            .then((ok)=>{
                if(!ok){
                    needPunishment.push(key);
                    console.log("Source["+key+"] ask, received not valid value.");
                }
                barier++;
                if(barier>=sourcesCount){
                    cbSYnc(needPunishment);
                }
            })
            .catch((err)=>{
                needPunishment.push(key);
                console.log("Source["+key+"] ask, ERROR: "+ err.message);
                barier++;
                if(barier>=sourcesCount){
                    cbSYnc(needPunishment);
                }
            });
        });
    }
    for(var s in sources){
        notAborted.set(sources[s].getSource().getURL(),sources[s]);
    }
    var countRequest=0;
    const recursive = ()=>{
        countRequest++;
        if(countRequest>Conf.AUTOCORRELATION){
            cb(sources);
        }else{
            // console.log("recursive CALL"); //ok
            askTo((needPunishment:Array<string>)=>{
                for(var x in needPunishment){
                   const key= needPunishment[x];
                   const source = notAborted.get(key);
                   if(source!==undefined){
                        source.getSource().punish();
                        notAborted.delete(key);
                   }else{
                       console.log("Warning: the source is missing for key: "+key);
                   }
                }
                setTimeout(recursive,Conf.T);
            });
        }
    }
    setTimeout(recursive,Conf.T);
}