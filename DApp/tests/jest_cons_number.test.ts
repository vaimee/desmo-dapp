import TestUtils from "./TestUtils";
import NumberSourceValues from "../src/model/NumberSourceValues";
import Config from "../src/const/Config";
import MockSourceNumb from "./MockSourceNumb";
import genMockSources from "./GenerateMockSources";
import { consensus, collect } from "../src/component/consensus/dataCollector";


//method that print a table that can be used for github readme.md
const printMatrixs = function (sources: Array<NumberSourceValues>, offsetTime = 0): void {

    var bigStart = 0;//the bigger of the min of starts
    var smallEnd = Infinity; //the min of the bigger of ends
    var header = "";
    var temp = "";
    for (var s in sources) {
        if (!sources[s].getSource().isPunished()) {
            const start = sources[s].getTemporalStart();
            const end = sources[s].getTemporalStop();
            if (bigStart < start) {
                bigStart = start;
            }
            if (smallEnd > end) {
                smallEnd = end;
            }
            if (temp === "") {
                const temporalDistribution = sources[s].getTemporalDistribution();
                for (var x = 0; x < temporalDistribution.length; x++) {
                    header += "| x=" + x;
                    temp += "| ------------- ";
                }
            }
        }
    }

    var m_str = "###Original matrix:\n" + header;
    m_str += "|\n" + temp + "|\n";

    const step = (smallEnd - bigStart) / Config.AUTOCORRELATION;

    for (var i = 0; i < sources.length; i++) {
        if (!sources[i].getSource().isPunished()) {
            const temporalDistribution = sources[i].getTemporalDistribution();
            for (var x = 0; x < temporalDistribution.length; x++) {
                const cell = "(" + Math.trunc(temporalDistribution[x].value * 100) / 100 + "," + Math.trunc((temporalDistribution[x].date - offsetTime) * 100) / 100 + ")";
                m_str += "| " + cell;
            }
            m_str += "|\n";
        }
    }
    m_str += "###Sync matrix:\n" + header
    m_str += "|\n" + temp + "|\n";
    var tick = bigStart;
    // console.log("tick",tick)
    // console.log("offsetTime",offsetTime)
    for (var i = 0; i < sources.length; i++) {
        if (!sources[i].getSource().isPunished()) {
            const temporalDistribution = sources[i].getSyncTemporalDistribution();
            // console.log("temporalDistribution",temporalDistribution);
            for (var x = 0; x < temporalDistribution.length; x++) {
                const cell = "(" + Math.trunc(temporalDistribution[x] * 100) / 100 + "," + Math.trunc((tick - offsetTime) * 100) / 100 + ")";
                m_str += "| " + cell;
                tick += step;
            }
            tick=bigStart;
            m_str += "|\n";
        }
    }
    console.log(m_str);
}

const run_test = async function (sources: Array<NumberSourceValues>): Promise<number>{
    const dateOffset = Date.now();
    const s = await collect(sources);
    console.log("\n###########################Sources after collect");
    for(var x in s){
        console.log(s[x].toInfoString())
    }
    
    const ris = consensus(s);
    const value = ris.getValue();

    printMatrixs(s as Array<NumberSourceValues>, dateOffset);

    
    var scoreSources = "| ";
    for (var x in sources) {
        const index = sources[x].getSource().getIndex();
        const score = sources[x].getSource().getScore();
        scoreSources+=index+": "+score+" | ";
    }

    console.log("################################################\n"); 
    console.log("ScoreSources TDs: " + scoreSources);
    console.log("ScoreSources Directory: ", ris.getScores());
    console.log("Value: " + value)
    return Number(value) ;
}

const generic_test =async  function (valueMatrix: (number | null)[][]): Promise<number|null> {
    if (Config.AUTOCORRELATION !== valueMatrix[0].length) {
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSourceNumb length!");
        console.log("The text matrix is " + valueMatrix.length + "x" + valueMatrix[0].length);
        return null;
    } else {
        console.log("###########TEST matrix:", valueMatrix);
        const sources = new Array<NumberSourceValues>();
        for (let x = 0; x < valueMatrix.length; x++) {
            sources.push(new NumberSourceValues(new MockSourceNumb("Source_" + x, x, valueMatrix[x])))
        }
        return await run_test(sources);
    }
}

const test_01 =async  function (): Promise<number|null> {
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on NumberSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        [2.11, 2.20, 2.52, 2.75],
        [2.2, 2.44, 2.44, 2.80],
        [2.4, 2.5, 2.4, 2.4],
        [2.15, 5.0, 2.82, 2.99],
        [2.14, 2.1, 2.3, 2.67],
        [2.5, 2.66, 2.33, 2.71],
    ];
    return generic_test(valueMatrix);

}

const test_02 = async function (): Promise<number|null>{
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("Start TEST consensus on NumberSourceValues 6 source (2 source not valid)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        [2.11, 2.20, 2.52, 2.75],
        [2.2, 2.44, 2.44, 2.80],
        [2.4, 2.2, 2.4, 2.4],
        [2.15, null, 2.82, 2.99],
        [2.14, 2.1, 2.3, 2.67],
        [null, 2.66, 2.33, 2.71],
    ];
    return await generic_test(valueMatrix);

}

const test_03 =async function (): Promise<number|null>{
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    const missingProb = 10;
    const oorProb = 10;
    console.log("Start TEST randoms values " + missingProb + "% of not valid value and " + oorProb + "% of out of range value.");

    return await generic_test(genMockSources(10, 0, 100, 2, missingProb, oorProb));

}

const test_04 = async function (): Promise<number|null> {
    console.log("\n+++++++++++++++++++++TEST 04+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 04+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 04+++++++++++++++++++++");
    const sources = new Array<NumberSourceValues>();
    const s1 = new MockSourceNumb("Source_0", 0,[1.0,1.0,1.0,0.0,]);
    const s2 = new MockSourceNumb("Source_1", 1,[1.0,2.0,1.0,4.0,]);
    const s1_bis = new MockSourceNumb("Source_0", 0,[1.0,2.0,null,4.0,]);
    const s3 = new MockSourceNumb("Source_2", 2,[1.0,10.0,null,4.0,]);
    sources.push(new NumberSourceValues(s1)); //same source different TD
    sources.push(new NumberSourceValues(s2));
    sources.push(new NumberSourceValues(s1_bis)); //same source different TD
    sources.push(new NumberSourceValues(s3)); 

    //expected:
    //S2 will win, S1 and S3 will discarded
    return await run_test(sources);
}

const test_05 =async function (): Promise<number|null> {
    console.log("\n+++++++++++++++++++++TEST 05+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 05+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 05+++++++++++++++++++++");
    const sources = new Array<NumberSourceValues>();
    const s1 = new MockSourceNumb("Source_0", 0,[1.1,2.2,1.5,0.9,]);
    const s2 = new MockSourceNumb("Source_1", 1,[1.0,2.0,1.0,4.0,]);
    const s1_bis = new MockSourceNumb("Source_0", 0,[1.8,1.5,1.1,1.7,]);
    const s3 = new MockSourceNumb("Source_2", 2,[1.3,0.9,1.1,1.2,]);
    const s1_bis_bis = new MockSourceNumb("Source_0", 0,[null,1.5,1.1,1.7,]);
    const s4 = new MockSourceNumb("Source_3", 3,[1.2,1.5,0.9,0.9,]);
    const s5 = new MockSourceNumb("Source_4", 4,[1.1,10.1,0.1,4.1,]);
    const s3_bis = new MockSourceNumb("Source_3",3,[1.2,1.5,0.9,0.9,]);

    sources.push(new NumberSourceValues(s1)); 
    sources.push(new NumberSourceValues(s2));
    sources.push(new NumberSourceValues(s1_bis));
    sources.push(new NumberSourceValues(s3)); 
    sources.push(new NumberSourceValues(s1_bis_bis));
    sources.push(new NumberSourceValues(s4));
    sources.push(new NumberSourceValues(s5)); 
    sources.push(new NumberSourceValues(s3_bis)); 

    //expected:
    //S2 and S2 Discarded, 

   return await run_test(sources);
}


//-------------------------------------------

test('TestConsNumb.test01', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_01",test_01,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test02', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_02",test_02,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});


test('TestConsNumb.test03', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_03",test_03,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test04', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_04",test_04,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test05', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_05",test_05,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

