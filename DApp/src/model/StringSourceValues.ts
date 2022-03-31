import Source from "./Source";
import ISourceValues from "./ISourceValues";

export default class StringSourceValues implements ISourceValues{

    source: Source;
    temporalDistribution:Array<{value:string,date:number}>;
    syncTemporalDistribution:Array<string>;
    _tempForSync:number;
    
    constructor(source: Source){
        this.source=source;
        this.temporalDistribution=new Array<{value:string,date:number}>();
        this.syncTemporalDistribution=new Array<string>();
        this._tempForSync=0;
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
        return true;
    }

    getTemporalDistribution():Array<{value:string,date:number}>{
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

    setSyncTemporaldistributionAt(){
        // var indexStart =0;
        // var indexEnd =0;
        // for(var x= this._tempForSync;x<this.temporalDistribution.length;x++){
        //     if(this.temporalDistribution[x].date>=time){
        //         indexEnd=x;
        //         indexStart=x;
        //         break;
        //     }
        // }
        // for(var x= this._tempForSync;x<indexEnd;x++){
        //     if(this.temporalDistribution[x].date<=time){
        //         indexStart=x;
        //         break;
        //     }
        // }
        // this._tempForSync=indexStart;
        // const distance_s = Math.abs(this.temporalDistribution[indexStart].date-time);
        // const distance_e = Math.abs(this.temporalDistribution[indexEnd].date-time);
        // if(distance_s>distance_e){
        //     this.syncTemporalDistribution.push(this.temporalDistribution[indexEnd].value);
        // }else{
        //     this.syncTemporalDistribution.push(this.temporalDistribution[indexStart].value);
        // }
    }
  
}