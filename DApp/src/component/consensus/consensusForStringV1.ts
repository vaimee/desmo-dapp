import StringSourceValues from "../../model/StringSourceValues";
import Conf from "../../const/Config";


type CommmonAndProb = { common: string, prob: number }

// this is the simplest heuristic function and its result is "0" or "1".
// we can upgrade it with a semantic distance vector with a result range between "0" and "1"
function h(a: string, b: string) {
    if (a.trim().toLocaleLowerCase() === b.trim().toLocaleLowerCase()) {
        return 1;
    } else {
        return 0;
    }
}

function getCommonAndProb(values: Array<string>) {
    const hashMap = new Map<String, number>();
    for (var x in values) {
        // console.log("x--->",x);
        if (hashMap.has(values[x])) {
            const temp = hashMap.get(values[x]);
            if(temp!==undefined){
                hashMap.set(values[x],  temp + 1);
            }
        } else {
            hashMap.set(values[x], 1);
        }
    }
    var best = values[0];
    var bestCount = 0;
    for (var key in hashMap.keys) {
        const actualC = hashMap.get(key);
        if(actualC!==undefined){
            if (actualC > bestCount) {
                bestCount = actualC;
                best =key;
            }
        }
    }
    return { common: best, prob: bestCount };
}

export default function consensus(sourcesAndValues: Array<StringSourceValues>): string {

    const temp = new Array<Array<string>>();
    const sources = new Array<CommmonAndProb>();   //AutoCorrelation
    const times = new Array<CommmonAndProb>();     //CrossCorrelation
    var avaragePropsRows = 0;

    //STEP 1

    for (var x in sourcesAndValues) {
        const dist = sourcesAndValues[x].getDistribution();
        temp.push(dist);
        const candp = getCommonAndProb(dist);
        sources.push(candp);
        avaragePropsRows+=candp.prob;
    }
    avaragePropsRows=avaragePropsRows/sourcesAndValues.length;

    for (let x = 0; x < Conf.AUTOCORRELATION; x++) {
        const dist = new Array<string>();
        for (let y = 0; y < sourcesAndValues.length; y++) {
            dist.push(temp[y][x]);
        }
        times.push(getCommonAndProb(dist));
    }

    //STEP 2
    //found the common value on crossCorrelation (from different source same time)
    var indexsWin = new Array<number>();
    var bestValues = new Array<string>();
    var bestProb = 0;
    for (let i = 0; i < times.length; i++) {
        if (times[i].prob > bestProb) {
            indexsWin = new Array<number>();
            indexsWin.push(i);
            bestValues.push(times[i].common);
        } else if (times[i].prob === bestProb) {
            indexsWin.push(i);
            bestValues.push(times[i].common);
        }
    }
    if(indexsWin.length===0){
        return "";
    }else if(indexsWin.length===1){
        return times[indexsWin[0]].common;
    }else{

        //STEP 3 (crosscorrelation)
        const candp = getCommonAndProb(bestValues);
        // if(candp.prob>=0.5){
            return candp.common;
        // }

        // var abs = Infinity;
        // var bestSource =0;
        // for (let i = 0; i < sources.length; i++) {
        //     const tempAbs= Math.abs(sources[i].prob-avaragePropsRows);
        //     if(tempAbs<abs){
        //         abs=tempAbs;
        //         bestSource=i;
        //     }
        // }
        
    }

  

}