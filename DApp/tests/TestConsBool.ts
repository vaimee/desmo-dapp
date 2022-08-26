import BoolSourceValues from "../src/model/BoolSourceValues";
import Config from "../src/const/Config";
import MockSourceBool from "./MockSourceBool";
import { consensus, collect } from "../src/component/consensus/dataCollector";



const run_test = async function (sources: Array<BoolSourceValues>) :Promise<string>{

    const s = await collect(sources);
    console.log("\n###########################Sources after collect");
    for(var x in s){
        console.log(s[x].toInfoString())
    }

    var matrix = "";
    for (var x in sources) {
        for (var y in sources[x].distribution) {
            matrix += "|\t" + sources[x].distribution[y] + "\t";
        }
        matrix += "|\n";
    }
    console.log(matrix);
    const value = consensus(s).getValue();

    var scoreSources = "| ";
    for (var x in sources) {
        const index = sources[x].getSource().getIndex();
        const score = sources[x].getSource().getScore();
        scoreSources+=index+": "+score+" | ";
    }

    console.log("################################################\n");
    console.log("ScoreSources: " + scoreSources);
    console.log("Value: " + value);
     return value;
}

const generic_test =async function (valueMatrix: (boolean | null)[][]):Promise<string|null> {
    if (Config.AUTOCORRELATION !== valueMatrix[0].length) {
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSourceBool length!");
        console.log("The text matrix is " + valueMatrix.length + "x" + valueMatrix[0].length);
        return null;
    } else {
        // console.log("###########TEST matrix:",valueMatrix);
        const sources = new Array<BoolSourceValues>();
        for (var x = 0; x < valueMatrix.length; x++) {
            sources.push(new BoolSourceValues(new MockSourceBool("Source_" + x, x, valueMatrix[x])))
        }
        return await run_test(sources);
    }
}

const test_01 =async function ():Promise<string|null>  {
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on BoolSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        [true, true, true, false],
        [true, true, true, true],
        [false, true, false, false],
        [true, true, false, true],
        [false, false, false, false],
        [false, false, true, false],
    ];
   return await generic_test(valueMatrix);

}


export default {
    test_01: test_01,
}