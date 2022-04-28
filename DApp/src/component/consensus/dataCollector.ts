import ISourceValues from "../../model/ISourceValues";
import NumberSourceValues from "../../model/NumberSourceValues";
import StringSourceValues from "../../model/StringSourceValues";
import BoolSourceValues from "../../model/BoolSourceValues";
import consensusForNumber from "./consensusForNumber";
import consensusForString from "./consensusForString";
import consensusForBool from "./consensusForBool";
import Result from "../../model/Result";
import Conf from "../../const/Config";
import Types from "../../const/Types";

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
            consensusForBool(sources as Array<BoolSourceValues>).toString(),
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
    
    const notAborted = new Set<number>();
    const askTo=(cbSYnc:(np:Array<number>)=>void)=>{
        // const keys= notAborted.keys();
        const needPunishment = new Array<number>();
        var barier=0;
        const sourcesCount = sources.length;
        // console.log("notAborted",notAborted);
        // console.log("notAborted.size",notAborted.size);
        for(var s in sources){
            const actualSource= sources[s];
            const key =actualSource.getSource().getIndex();
            if(notAborted.has(key)){
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
            }else{
                barier++;
                if(barier>=sourcesCount){
                    cbSYnc(needPunishment);
                }
            }
        }
    }

    for(var s in sources){
        const index = sources[s].getSource().getIndex();
        notAborted.add(index);
    }
    var countRequest=0;
    const recursive = ()=>{
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
            cb(sources);
        }else{  
            // console.log("recursive CALL"); //ok
            askTo((needPunishment:Array<number>)=>{
                for(var x in needPunishment){
                   const key= needPunishment[x];
                   if(notAborted.has(key)){
                     notAborted.delete(key);
                   }
                }
                setTimeout(recursive,Conf.T);
            });
        }
    }
    setTimeout(recursive,Conf.T);
}