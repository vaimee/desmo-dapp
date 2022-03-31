import NumberSourceValues from "../model/NumberSourceValues";
import Config from "../const/Config";
import MockSource from "./MockSource";
import genMockSources from "./GenerateMockSources";
import {consensus,collect} from "../component/DataCollector";


//method that print a table that can be used for github readme.md
const printMatrixs=function(sources: Array<NumberSourceValues>,offsetTime=0):void{

    var bigStart = 0;//the bigger of the min of starts
    var smallEnd = Infinity; //the min of the bigger of ends
    var header = "";
    var temp = "";
    for(var s in sources){
        if(!sources[s].getSource().isPunished()){
            const start = sources[s].getTemporalStart();
            const end =  sources[s].getTemporalStop();
            if(bigStart<start){
                bigStart=start;
            }
            if(smallEnd>end){
                smallEnd=end;
            }
            if(temp===""){
                const temporalDistribution = sources[s].getTemporalDistribution();
                for(var x=0;x<temporalDistribution.length;x++){
                    header+="| x="+x;
                    temp+= "| ------------- ";
                }
            }
        }
    }

    var m_str = "###Original matrix:\n"+header;
    m_str+="|\n"+temp+"|\n";

    const step = (smallEnd-bigStart)/Config.AUTOCORRELATION;
   
    for(var i=0;i<sources.length;i++){
        if(!sources[i].getSource().isPunished()){
            const temporalDistribution = sources[i].getTemporalDistribution();
            for(var x=0;x<temporalDistribution.length;x++){
                    const cell=  "("+Math.trunc(temporalDistribution[x].value*100)/100+","+ Math.trunc((temporalDistribution[x].date-offsetTime)*100)/100 +")";
                    m_str+="| "+cell;
            }
            m_str+="|\n";
        }
    }
    m_str+="###Sync matrix:\n" +header
    m_str+="|\n"+temp+"|\n";
    var tick = bigStart;
    // console.log("tick",tick)
    // console.log("offsetTime",offsetTime)
    for(var i=0;i<sources.length;i++){
        if(!sources[i].getSource().isPunished()){
            const temporalDistribution = sources[i].getSyncTemporalDistribution();
            // console.log("temporalDistribution",temporalDistribution);
            for(var x=0;x<temporalDistribution.length;x++){
                 const cell=  "("+Math.trunc(temporalDistribution[x]*100)/100+","+ Math.trunc((tick-offsetTime)*100)/100 +")";
                 tick+=step;
                 m_str+="| "+cell;
            }
            m_str+="|\n";
        }
     }
    console.log(m_str);
}

const run_test =function(sources: Array<NumberSourceValues>,cb:(ris:number)=>void){
    const dateOffset = Date.now();
    collect(sources,
        (s)=>{

            /*
            console.log("\n###########################Sources after collect");
            for(var x in s){
                console.log(s[x].toInfoString())
            }
            console.log("################################################\n");
            console.log("\n###########################Sources after algorithm");
            for(var x in s){
                console.log(s[x].toInfoString())
            }
            */


            const value = consensus(s).getValue();
            
            printMatrixs(s as Array<NumberSourceValues>,dateOffset);

            console.log("################################################\n");
            console.log("Value: "+value);
            cb(Number(value));
        }
    );
}

const generic_test=function(valueMatrix:(number | null)[][],cb:(ris:number)=>void){
    if(Config.AUTOCORRELATION!==valueMatrix[0].length){
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSource length!");
        console.log("The text matrix is "+ valueMatrix.length +"x"+valueMatrix[0].length);
    }else{
        console.log("###########TEST matrix:",valueMatrix);
        const sources =new Array<NumberSourceValues>();
        for(var x =0;x<valueMatrix.length;x++){
            sources.push(new NumberSourceValues(new MockSource("Source_"+x,valueMatrix[x])))
        }
        run_test(sources,cb);
    }
}

const test_01=function(cb:(ris:number)=>void):void{
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on NumberSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix=[
        [2.11,2.20,2.52,2.75],
        [2.2,2.44,2.44,2.80],
        [2.4,2.5,2.4,2.4],
        [2.15,5.0,2.82,2.99],
        [2.14,2.1,2.3,2.67],
        [2.5,2.66,2.33,2.71],
    ];
    generic_test(valueMatrix,cb);
    
}

const test_02=function(cb:(ris:number)=>void):void{
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 02+++++++++++++++++++++");
    console.log("Start TEST consensus on NumberSourceValues 6 source (2 source not valid)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix=[
        [2.11,2.20,2.52,2.75],
        [2.2,2.44,2.44,2.80],
        [2.4,2.2,2.4,2.4],
        [2.15,null,2.82,2.99],
        [2.14,2.1,2.3,2.67],
        [null,2.66,2.33,2.71],
    ];
    generic_test(valueMatrix,cb);
    
}

const test_03=function(cb:(ris:number)=>void):void{
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 03+++++++++++++++++++++");
    const missingProb = 10;
    const oorProb = 10;
    console.log("Start TEST randoms values "+missingProb+"% of not valid value and "+oorProb+"% of out of range value.");
  
    generic_test(genMockSources(10,0,100,2,missingProb,oorProb),cb);
    
}


export default {
    test_01: test_01,
    test_02: test_02,
    test_03: test_03
}