import ISource from "./ISource";
import ISourceValues from "./ISourceValues";

export default class NumberSourceValues implements ISourceValues{

    source: ISource;
    temporalDistribution:Array<{value:number,date:number}>;
    syncTemporalDistribution:Array<number>;
    temporalStart:number;
    temporalStop:number;
    _tempForSync:number;

    constructor(source: ISource){
        this.source=source;
        this.temporalStart=Infinity;
        this.temporalStop=0;
        this.syncTemporalDistribution=new Array<number>();
        this.temporalDistribution=new Array<{value:number,date:number}>();
        this._tempForSync=0;
    }

    getInfo():{}{
        return {
            dist_size:this.temporalDistribution.length,
            sync_dist_size:this.syncTemporalDistribution.length,
            temporalStart:this.temporalStart,
            temporalStop:this.temporalStop,
            punished:this.source.isPunished()
        };
    }

    toInfoString(): string {
        return  this.toString()+":"+JSON.stringify(this.getInfo());
    }

    toString(): string {
        return "NumberSourceValues["+this.source.getIndex()+"]";
    }

    parse(v:string):number|null{ 
        if( !isNaN(Number(v)) && !isNaN(parseFloat(v))){
            return Number(v);
        }else{
            return null;
        }
        
    }

   

    async addTemporalValue():Promise<boolean>{
        const v_str =await this.source.ask();
        if(v_str===null){
            return false;
        }
        const value =this.parse(v_str);
        if(value===null){
            return false;
        }
        const d=Date.now();
        this.temporalDistribution.push({
            value:value,
            date:d
        });
        if(this.temporalStart>d){
            this.temporalStart=d;
        }
        if(this.temporalStop<d){
            this.temporalStop=d;
        }
        return true;
    }

    getTemporalDistribution():Array<{value:number,date:number}>{
        return this.temporalDistribution;
    }

    getSyncTemporalDistributionAt(at:number):number{
        return this.syncTemporalDistribution[at];
    }

    getBestRealValueAt(time:number,value:number):number{
        //console.log("getBestRealValueAt for source: "+ this.source.getIndex());
        var indexStart =0;
        var indexEnd =0;
        for(var x=0;x<this.temporalDistribution.length;x++){
            if(this.temporalDistribution[x].date>=time){
                indexEnd=x;
                indexStart=x;
                break;
            }
        }
        for(var x=indexEnd;x>-1;x--){
            if(this.temporalDistribution[x].date<=time){
                indexStart=x;
                break;
            }
        }
        const ds= Math.abs(value-this.temporalDistribution[indexStart].value);        
        const de= Math.abs(value-this.temporalDistribution[indexEnd].value);
        // console.log("####################getBestRealValueAt");
        // console.log("time",time);
        // console.log("indexStart",indexStart);
        // console.log("indexEnd",indexEnd);
        // console.log("this.temporalDistribution",this.temporalDistribution);
        // console.log("this.syncTemporalDistribution",this.syncTemporalDistribution);
        // console.log("value",value);
        // console.log("valueS",this.temporalDistribution[indexStart].value);
        // console.log("valueE",this.temporalDistribution[indexEnd].value);
        // console.log("#####################################");
        if(ds<de){
            return this.temporalDistribution[indexStart].value;
        }else{
            return this.temporalDistribution[indexEnd].value;
        }
    }

    getSource():ISource{
        return this.source;
    }


    setSyncTemporaldistributionAt(time:number){
        // console.log("time",time)
        var indexStart =0;
        var indexEnd =0;
        for(var x= this._tempForSync;x<this.temporalDistribution.length;x++){
            if(this.temporalDistribution[x].date>=time){
                indexEnd=x;
                indexStart=x;
                break;
            }
        }
        for(var x= this._tempForSync;x<indexEnd;x++){
            if(this.temporalDistribution[x].date<=time){
                indexStart=x;
                break;
            }
        }
        this._tempForSync=indexStart;

        //build the line passing through the two points
        const _t1= this.temporalDistribution[indexEnd].date;
        const _t2 = this.temporalDistribution[indexStart].date;
        const _v1 = this.temporalDistribution[indexEnd].value
        const _v2 = this.temporalDistribution[indexStart].value;
        if(_v1===_v2){
            this.syncTemporalDistribution.push(_v1);
        }else if(_t1===_t2){
            this.syncTemporalDistribution.push((_v1+_v2)/2);
        }else{
            //(x-_v1)/(_v2-_v1)=(y-_t1)/(_t2-_t1)
            const syncValue=(((time-_t1)/(_t2-_t1))*(_v2-_v1))+_v1;
            this.syncTemporalDistribution.push(syncValue);
        }
       
    }

    getSyncTemporalDistribution():Array<number>{
        return this.syncTemporalDistribution;
    }

    getTemporalStart():number{
        return this.temporalStart;
    }
    
    getTemporalStop():number{
        return this.temporalStop;
    }

  

}