import StringSourceValues from "../model/StringSourceValues";
import Config from "../const/Config";
import MockSourceStr from "./MockSourceStr";
import { consensus, collect } from "../component/consensus/dataCollector";



const run_test = function (sources: Array<StringSourceValues>, cb: (ris: string) => void) {

    collect(sources,
        (s) => {

            var matrix = "";
            for (var x in sources) {
                matrix +=  "index["+sources[x].getSource().getIndex()+"]\t";
                for (var y in sources[x].distribution) {
                    matrix += "|\t" + sources[x].distribution[y] + "\t";
                }
                matrix += "|\n";
            }
            console.log(matrix);
            const ris = consensus(s);
            const value = ris.getValue();

            var scoreSources = "| ";
            for (var x in sources) {
                const index = sources[x].getSource().getIndex();
                const score = sources[x].getSource().getScore();
                scoreSources+=index+": "+score+" | ";
            }

            console.log("################################################\n");
            console.log("ScoreSources: " + scoreSources);
            console.log("ScoreSources Directory: ", ris.getScores());
            console.log("Value: " + value);
            cb(value);
        }
    );
}

const generic_test = function (valueMatrix: (string | null)[][], cb: (ris: string) => void) {
    if (Config.AUTOCORRELATION !== valueMatrix[0].length) {
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSourceStr length!");
        console.log("The text matrix is " + valueMatrix.length + "x" + valueMatrix[0].length);
    } else {
        // console.log("###########TEST matrix:",valueMatrix);
        const sources = new Array<StringSourceValues>();
        for (var x = 0; x < valueMatrix.length; x++) {
            sources.push(new StringSourceValues(new MockSourceStr("Source_" + x, x, valueMatrix[x])))
        }
        run_test(sources, cb);
    }
}

const test_01 = function (cb: (ris: string) => void): void {
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on StringSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        ["RED", "RED", "RED", "BLACK"],
        ["RED", "YELLOW", "RED", "RED"],
        ["YELLOW", "GREEN", "RED", "GREEN"],
        ["RED", "YELLOW", "GREEN", "GREEN"],
        ["YELLOW", "YELLOW", "BLACK", "..."],
        ["RED", "YELLOW", "BLACK", "BLACK"],
    ];
    generic_test(valueMatrix, cb);

}

const test_02 = function (cb: (ris: string) => void): void {
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("Start TEST consensus on StringSourceValues 6 source (1 not good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        ["RED", "RED", "RED", "BLACK"],
        ["RED", "YELLOW", "RED", "RED"],
        ["YELLOW", "GREEN", "RED", "GREEN"],
        ["RED", "YELLOW", "GREEN", "GREEN"],
        ["YELLOW", "YELLOW", "BLACK", "..."],
        ["RED", "YELLOW", null, "BLACK"],
    ];
    generic_test(valueMatrix, cb);

}


const test_03 = function (cb: (ris: string) => void): void {
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    const sources = new Array<StringSourceValues>();
    const s1 = new MockSourceStr("Source_0", 0,[null,"A","B","C",]);
    const s2 = new MockSourceStr("Source_1", 1,["A","A","B","C",]);
    const s1_bis = new MockSourceStr("Source_0", 0,["A","B","B","C",]);
    const s3 = new MockSourceStr("Source_2", 2,["A","B",null,"C",]);
    const s1_bis_bis = new MockSourceStr("Source_0", 0,["A","B","B","Z",]);
    const s4 = new MockSourceStr("Source_3", 3,["B","C","B","Z"]);
    const s5 = new MockSourceStr("Source_4", 4,["Z","X","T","K"]);
    const s3_bis = new MockSourceStr("Source_3",3,["A","O","B","Z"]);

    sources.push(new StringSourceValues(s1)); 
    sources.push(new StringSourceValues(s2));
    sources.push(new StringSourceValues(s1_bis));
    sources.push(new StringSourceValues(s3)); 
    sources.push(new StringSourceValues(s1_bis_bis));
    sources.push(new StringSourceValues(s4));
    sources.push(new StringSourceValues(s5)); 
    sources.push(new StringSourceValues(s3_bis)); 

    //expected:
    //S2 and S2 Discarded, 

    run_test(sources, cb);

}



export default {
    test_01: test_01,
    test_02: test_02,
    test_03: test_03
}