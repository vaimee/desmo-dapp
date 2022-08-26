import NumberSourceValues from "../../model/NumberSourceValues";
import Conf from "../../const/Config";
import Logger from "../Logger";

const componentName = "ConsensusForNumber";
function media(values: Array<number>): number {
    if (values.length < 1) {
        return 0;
    }
    var m = 0;
    for (var x in values) {
        m += values[x];
    }
    return m / values.length;
}

function sqm(values: Array<number>): number {
    const m = media(values);
    var s = 0;
    for (var x in values) {
        s += (values[x] - m) ** 2;
    }
    return Math.sqrt(s / (values.length - 1));
}

function buildSyncTemporalDistributions(sources: Array<NumberSourceValues>): Array<number> {
    var bigStart = 0;//the bigger of the min of starts
    var smallEnd = Infinity; //the min of the bigger of ends
    for (var x in sources) {
        const start = sources[x].getTemporalStart();
        const end = sources[x].getTemporalStop();
        if (bigStart < start) {
            bigStart = start;
        }
        if (smallEnd > end) {
            smallEnd = end;
        }
    }
    // console.log("bigStart",bigStart);
    // console.log("smallEnd",smallEnd);
    const step = (smallEnd - bigStart) / Conf.AUTOCORRELATION;
    var q = new Array<number>();
    for (let x = bigStart; x < smallEnd; x += step) {
        for (var s in sources) {
            sources[s].setSyncTemporaldistributionAt(x);
        }
        q.push(x);
    }
    return q;
}



function autocorrelation(source: NumberSourceValues): number {
    return sqm(source.getSyncTemporalDistribution());
}

function crosscorrelation(sources: Array<NumberSourceValues>, at: number): number {
    const values = new Array<number>();
    for (var s in sources) {
        values.push(sources[s].getSyncTemporalDistributionAt(at));
    }
    return sqm(values);
}


export default function consensus(sourcesAndValues: Array<NumberSourceValues>): number {

    Logger.getInstance().addLog(componentName,"Using consensus alghoritm for NUMBER");
    const notPunished = new Array<NumberSourceValues>();
    for (var s in sourcesAndValues) {
        if (!sourcesAndValues[s].getSource().isPunished()) {
            notPunished.push(sourcesAndValues[s]);
        }
    }

    if(notPunished.length<1){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[01]: no sources.",true);
        throw new Error("Impossible to reach consensus code[01]: no sources.");
    }

    //#########STEP 1
    //sync values using time
    const q = buildSyncTemporalDistributions(notPunished);

    //#########STEP 2
    //autocorrelation
    //find out the standard deviation between all the captured value of the same source
    const autoC = new Array<number>();
    for (var s in notPunished) {
        autoC.push(autocorrelation(notPunished[s]));
    }
    // console.log("autoC",autoC);

    if(autoC.length<1){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[02]: no autocorrelation.",true);
        throw new Error("Impossible to reach consensus code[02]: no autocorrelation.");
    }

    //#########STEP 3
    //select the best source looking at how much these values fluctuates
    const fluct = media(autoC);
    // console.log("fluct",fluct);
    var d = Infinity;
    var bestSource = 0;
    for (var x = 0; x < autoC.length; x++) {
        const actual_d = Math.abs(autoC[x] - fluct);
        if (actual_d < d) {
            d = actual_d;
            bestSource = x;
        }
    }

    //#########STEP 4
    //crosscorrelation
    //get the time with the min standard deviation based on time
    var crossc = Infinity;
    var bestTime = 0;
    if(q.length<1){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[03]: no crosscorrelation.",true);
        throw new Error("Impossible to reach consensus code[03]: no crosscorrelation.");
    }
    for (var t = 0; t < q.length; t++) {
        const crossTemp = crosscorrelation(notPunished, t);
        // console.log("crossTemp",crossTemp);
        if (crossTemp < crossc) {
            crossc = crossTemp;
            bestTime = t;
        }
    }

    // console.log("bestSource",bestSource);
    // console.log("bestTime",bestTime);

    //reward sources not punished
    if(autoC.length!==notPunished.length){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[04]: correlation and valid source must have the same cardinality.",true);
        throw new Error("Impossible to reach consensus code[04]: correlation and valid source must have the same cardinality.");
    }
    for (var x = 0; x < autoC.length; x++) {
        Logger.getInstance().addLog(componentName,"X["+x+"]bestSource["+bestSource+"]");
        if(x===bestSource){
            notPunished[bestSource].getSource().setScore(3);
        }else if(Math.abs(autoC[x]-fluct)<(fluct*2)){
            notPunished[x].getSource().setScore(2);
        }else{
            notPunished[x].getSource().setScore(1);
        }
    }
    
    //Find the best "REAL" value
    if(notPunished[bestSource]===undefined){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[05]: no best value found.",true);
        throw new Error("Impossible to reach consensus code[05]: no best value found.");
    }
    const bestMediaValue = notPunished[bestSource].getSyncTemporalDistributionAt(bestTime);
    return notPunished[bestSource].getBestRealValueAt(q[bestTime], bestMediaValue);
}