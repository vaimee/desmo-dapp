import NumberSourceValues from "../model/NumberSourceValues";
import Conf from "../const/Config";

function media(values: Array<number>):number{
    if(values.length<1){
        return 0;
    }
    var m =0;
    for(var x in values){
       m+=values[x];
    }
    return m/values.length;
}

function sqm(values: Array<number>):number{
    const m =media(values);
    var s =0;
    for(var x in values){
        s+=(values[x]-m)**2;
    }
    return Math.sqrt(s/(values.length-1));
}

function buildSyncTemporalDistributions(sources : Array<NumberSourceValues>): Array<number>{
    var bigStart = 0;//the bigger of the min of starts
    var smallEnd = Infinity; //the min of the bigger of ends
    // for(var x in sources){
    //     const dist =sources[x].getTemporalDistribution();
    //     for(var y in dist){
    //        if(min>dist[y].date){
    //            min=dist[y].date;
    //        }
    //        if(max<dist[y].date){
    //             max=dist[y].date;
    //        }
    //     }
    // }
    for(var x in sources){
        const start = sources[x].getTemporalStart();
        const end =  sources[x].getTemporalStop();
        if(bigStart<start){
            bigStart=start;
        }
        if(smallEnd>end){
            smallEnd=end;
        }
    }
    // console.log("bigStart",bigStart);
    // console.log("smallEnd",smallEnd);
    const step = (smallEnd-bigStart)/Conf.AUTOCORRELATION;
    var q =new Array<number>();
    for(let x=bigStart;x<smallEnd;x+=step){
        for(var s in sources){
            sources[s].setSyncTemporaldistributionAt(x);
        }
        q.push(x);
    }
    return q;
}



function autocorrelation(source: NumberSourceValues):number{
    return sqm(source.getSyncTemporalDistribution());
}

function crosscorrelation(sources : Array<NumberSourceValues>,at:number):number{
    const values =new Array<number>();
    for(var s in sources){
        values.push(sources[s].getSyncTemporalDistributionAt(at));
    }
    return sqm(values);
}


export default function consensus(sourcesAndValues : Array<NumberSourceValues>):number{
    
    //#########STEP 1
    //sync values using time
    const q = buildSyncTemporalDistributions(sourcesAndValues);
    
    //#########STEP 2
    //autocorrelation
    //find out the standard deviation between all the captured value of the same source
    const autoC=new Array<number>();
    for(var s in sourcesAndValues){
        autoC.push(autocorrelation(sourcesAndValues[s]));
    }
    
    //#########STEP 3
    //select the best source looking at (how much these values fluctuates)
    const fluct = media(autoC);
    var d = Infinity;
    var bestSource =0;
    for(var x=0;x<autoC.length;x++){
        const actual_d =Math.abs(autoC[x]-fluct);
        if(actual_d<d){
            d=actual_d;
            bestSource=x;
        }
    }

    //#########STEP 4
    //crosscorrelation
    //get the time with the min standard deviation based on time
    var crossc=Infinity;
    var bestTime=0;
    for(var t=0;t<q.length;t++){
        const crossTemp =crosscorrelation(sourcesAndValues,t);
        if(crossTemp<crossc){
            crossc=crossTemp;
            bestTime=t;
        }
    }
    //Find the best "REAL" value
    const bestMediaValue = sourcesAndValues[bestSource].getSyncTemporalDistributionAt(bestTime);
    return sourcesAndValues[bestSource].getBestRealValueAt(q[bestTime],bestMediaValue);
}