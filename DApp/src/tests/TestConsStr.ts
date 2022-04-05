import StringSourceValues from "../model/StringSourceValues";
import Config from "../const/Config";
import MockSourceStr from "./MockSourceStr";
import {consensus,collect} from "../component/dataCollector";



const run_test =function(sources: Array<StringSourceValues>,cb:(ris:string)=>void){
  
    collect(sources,
        (s)=>{

            var matrix = "";
            for(var x in sources){
                for (var y in sources[x].distribution){
                    matrix+="|\t"+sources[x].distribution[y]+"\t";
                }
                matrix+="|\n";
            }
            console.log("",matrix);
            const value = consensus(s).getValue();
            
            console.log("################################################\n");
            console.log("Value: "+value);
            cb(value);
        }
    );
}

const generic_test=function(valueMatrix:(string | null)[][],cb:(ris:string)=>void){
    if(Config.AUTOCORRELATION!==valueMatrix[0].length){
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSource length!");
        console.log("The text matrix is "+ valueMatrix.length +"x"+valueMatrix[0].length);
    }else{
        // console.log("###########TEST matrix:",valueMatrix);
        const sources =new Array<StringSourceValues>();
        for(var x =0;x<valueMatrix.length;x++){
            sources.push(new StringSourceValues(new MockSourceStr("Source_"+x,valueMatrix[x])))
        }
        run_test(sources,cb);
    }
}

const test_01=function(cb:(ris:string)=>void):void{
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on StringSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix=[
        ["RED",     "RED",      "RED","BLACK"],
        ["RED",     "YELLOW",   "RED","RED"],
        ["YELLOW",  "GREEN",    "RED","GREEN"],
        ["RED",     "YELLOW",   "GREEN","GREEN"],
        ["YELLOW",  "YELLOW",   "BLACK","..."],
        ["RED",     "YELLOW",   "BLACK","BLACK"],
    ];
    generic_test(valueMatrix,cb);
    
}


export default {
    test_01: test_01,
}