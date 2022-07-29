import ISource from "./ISource";
import ISourceValues from "./ISourceValues";

export default class BoolSourceValues implements ISourceValues{

    source: ISource;
    temporalDistribution:Array<{value:boolean,date:number}>;
    distribution:Array<boolean>;
    
    constructor(source: ISource){
        this.source=source;
        this.temporalDistribution=new Array<{value:boolean,date:number}>();
        this.distribution=new Array<boolean>();
    }

    parse(v:string):boolean{
        const temp_str = v.toLocaleLowerCase().trim();
        if(temp_str==="true" || temp_str==="false" ){
            if(temp_str==="true"){
                return true;
            }else{
                return false;
            }
        }else if(Number(v)){
            return true;
        }else{
            return false;
        }
    }

    async addTemporalValue():Promise<boolean>{
        const v_str =await this.source.ask();
        if(v_str===null){
            return false;
        }
        const  parsed_v= this.parse(v_str);
        this.temporalDistribution.push({
            value:parsed_v,
            date:Date.now()
        });
        this.distribution.push(parsed_v);
        /*
            We will use just "this.distribution"
            but in future we can use  "this.temporalDistribution"
            in order to calculate a better "probability" for the column of the
            matrix (look at "algorithm.md" and at "consensusForString.ts") 
        */
        return true;
    }

    getTemporalDistribution():Array<{value:boolean,date:number}>{
        return this.temporalDistribution;
    }

 

    getSource():ISource{
        return this.source;
    }

    getInfo():{}{
        return {
            dist_size:this.temporalDistribution.length,
            // sync_dist_size:this.syncTemporalDistribution.length,
            // temporalStart:this.temporalStart,
            // temporalStop:this.temporalStop
        };
    }

    toInfoString(): string {
        return  this.toString()+":"+JSON.stringify(this.getInfo());
    }

    toString(): string {
        return "BoolSourceValues["+this.source.getIndex()+"]";
    }

  
  
}