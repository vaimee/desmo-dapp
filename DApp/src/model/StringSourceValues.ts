import Source from "./Source";
import ISourceValues from "./ISourceValues";

export default class StringSourceValues implements ISourceValues{

    source: Source;
    temporalDistribution:Array<{value:String,date:number}>;

    constructor(source: Source){
        this.source=source;
        this.temporalDistribution=new Array<{value:String,date:number}>();
    }

    parse(v:String):String{
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
        return true;
    }

    getTemporalDistribution():Array<{value:String,date:number}>{
        return this.temporalDistribution;
    }

    getNumericTemporalDistribution():Array<{value:number,date:number}>{
       const ris =new Array<{value:number,date:number}>();
       for(var x in this.temporalDistribution){
            this.temporalDistribution[x]
       }
       return ris;
    }

    getSource():Source{
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
        return "StringSourceValues["+this.source.getURL()+"]";
    }
  
}