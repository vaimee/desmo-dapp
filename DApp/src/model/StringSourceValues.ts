import ISource from "./ISource";
import ISourceValues from "./ISourceValues";

export default class StringSourceValues implements ISourceValues{

    source: ISource;
    temporalDistribution:Array<{value:string,date:number}>;
    distribution:Array<string>;
    
    constructor(source: ISource){
        this.source=source;
        this.temporalDistribution=new Array<{value:string,date:number}>();
        this.distribution=new Array<string>();
    }

    parse(v:string):string{
        return v;
    }

    async addTemporalValue():Promise<boolean>{        
        const v_str =await this.source.ask();
        if(v_str===null){
            return false;
        }
        this.temporalDistribution.push({
            value:v_str,
            date:Date.now()
        });
        this.distribution.push(v_str);
        /*
            We will use just "this.distribution"
            but in future we can use  "this.temporalDistribution"
            in order to calculate a better "probability" for the column of the
            matrix (look at "algorithm.md" and at "consensusForString.ts") 
        */
        return true;
    }

    getTemporalDistribution():Array<{value:string,date:number}>{
        return this.temporalDistribution;
    }

    getDistribution():Array<string>{
        return this.distribution;
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
        return "StringSourceValues["+this.source.getIndex()+"]";
    }

  
  
}