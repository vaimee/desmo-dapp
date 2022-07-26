import TestConsNumb from "./TestConsNumb";
import TestEncoding from "./TestEncoding";
import TestConsStr from "./TestConsStr";
import TestConsBool from "./TestConsBool";
import UseCaseTest from "./UseCaseTest";
import QueryParserTest from "./QueryParserTest";
import WotTest from "./WotTest";
import TestUtils from "./TestUtils";

var globalTestTOT=0;
var globalTestPassed=0;



const consOnNumberTest = async () => {
    if (process.argv[2] === "number" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on number        #");
        console.log("####################TEST#################");
        console.log("\n");
        var res = "";
        var tot = 0;
        var passed = 0;

        tot++;
        if(await TestUtils.assertTest("Consensus_on_number:test_01",TestConsNumb.test_01,TestUtils.numberValidator)){
            passed++;
            res+="Consensus_on_number:test_01 PASSED\n";
        }else{
            res+="Consensus_on_number:test_01 NOT PASSED\n";
        }

        tot++;
        if(await TestUtils.assertTest("Consensus_on_number:test_02",TestConsNumb.test_02,TestUtils.numberValidator)){
            passed++;
            res+="Consensus_on_number:test_02 PASSED\n";
        }else{
            res+="Consensus_on_number:test_02 NOT PASSED\n";
        }

        tot++;
        if(await TestUtils.assertTest("Consensus_on_number:test_03",TestConsNumb.test_03,TestUtils.numberValidator)){
            passed++;
            res+="Consensus_on_number:test_03 PASSED\n";
        }else{
            res+="Consensus_on_number:test_03 NOT PASSED\n";
        }

        tot++;
        if(await TestUtils.assertTest("Consensus_on_number:test_04",TestConsNumb.test_04,TestUtils.numberValidator)){
            passed++;
            res+="Consensus_on_number:test_04 PASSED\n";
        }else{
            res+="Consensus_on_number:test_04 NOT PASSED\n";
        }

        tot++;
        if(await TestUtils.assertTest("Consensus_on_number:test_05",TestConsNumb.test_05,TestUtils.numberValidator)){
            passed++;
            res+="Consensus_on_number:test_05 PASSED\n";
        }else{
            res+="Consensus_on_number:test_05 NOT PASSED\n";
        }
        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  Consensus_on_number-> passed "+passed+"/"+tot+" \n" +res;

    } else {
        return "";
    }
}


const consOnBoolTest =async () => {
    if (process.argv[2] === "bool" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on boolean       #");
        console.log("####################TEST#################");
        console.log("\n");
        
        var res = "";
        var tot = 0;
        var passed = 0;

        tot++;
        if(await TestUtils.assertTest("Consensus_on_bool:test_01",TestConsBool.test_01,TestUtils.boolValidator)){
            passed++;
            res+="Consensus_on_bool:test_01 PASSED\n";
        }else{
            res+="Consensus_on_bool:test_01 NOT PASSED\n";
        }

        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  Consensus_on_bool-> passed "+passed+"/"+tot+" \n" +res;

    } else {
        return "";
    }
}


const consOnStringTest =async  () => {
    if (process.argv[2] === "str" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#            consensus on string        #");
        console.log("####################TEST#################");
        console.log("\n");

        var res = "";
        var tot = 0;
        var passed = 0;

        tot++;
        if(await TestUtils.assertTest("Consensus_on_str:test_01",TestConsStr.test_01,TestUtils.strValidator)){
            passed++;
            res+="Consensus_on_str:test_01 PASSED\n";
        }else{
            res+="Consensus_on_str:test_01 NOT PASSED\n";
        }

        tot++;
        if(await TestUtils.assertTest("Consensus_on_str:test_02",TestConsStr.test_02,TestUtils.strValidator)){
            passed++;
            res+="Consensus_on_str:test_02 PASSED\n";
        }else{
            res+="Consensus_on_str:test_02 NOT PASSED\n";
        }
        
        tot++;
        if(await TestUtils.assertTest("Consensus_on_str:test_03",TestConsStr.test_03,TestUtils.strValidator)){
            passed++;
            res+="Consensus_on_str:test_03 PASSED\n";
        }else{
            res+="Consensus_on_str:test_03 NOT PASSED\n";
        }

        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  Consensus_on_str-> passed "+passed+"/"+tot+" \n" +res;
    } else {
        return "";
    }
}

const ecnodingTest = async () => {
    if (process.argv[2] === "encoding" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                encoding               #");
        console.log("####################TEST#################");
        console.log("\n");

      
        var res = "";
        var tot = 0;
        var passed = 0;

        for (var test in TestEncoding) {
            tot++;
            try{
                if(await TestEncoding[test]()){
                    passed++;
                    res+="Encoding:"+test+" PASSED\n";
                }else{
                    res+="Encoding:"+test+" NOT PASSED\n";
                }
            }catch(err){
                console.log("Encoding:"+test+"->Err: ",err);
                res+="Encoding:"+test+" NOT PASSED\n";
            }
        }

        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  Encoding-> passed "+passed+"/"+tot+" \n" +res;
    }
    return "";
}


const useCaseTest =async () => {
    if (process.argv[2] === "usecase" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                 USE CASE              #");
        console.log("####################TEST#################");
        console.log("\n");
         
        var res = "";
        var tot = 0;
        var passed = 0;
        tot++;
        if(await UseCaseTest.test_01()){
            passed++;
            res+="UseCase-Linksmart PASSED\n";
        }else{
            res+="UseCase-Linksmart NOT PASSED\n";
        }
        globalTestTOT+=tot;
        globalTestPassed+=passed;
        
              return"######  UseCase-> passed "+passed+"/"+tot+" \n" +res;
    }else if(process.argv[2] === "zion"){
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                 USE CASE              #");
        console.log("####################TEST#################");
        console.log("\n");
        var res = "";
        var tot = 0;
        var passed = 0;
        tot++;
        if(await UseCaseTest.test_02()){
            passed++;
            res+="UseCase-Zion PASSED\n";
        }else{
            res+="UseCase-Zion NOT PASSED\n";
        }
        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  UseCase-> passed "+passed+"/"+tot+" \n" +res;
    } else {
        return "";
    }
}

const wotTest = async () => {
    if (process.argv[2] === "wot" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                  WOT                  #");
        console.log("####################TEST#################");
        console.log("\n");
           
        var res = "";
        var tot = 0;
        var passed = 0;

        for (var test in WotTest) {
            tot++;
            try{
                if(await WotTest[test]()){
                    passed++;
                    res+="Wot:"+test+" PASSED\n";
                }else{
                    res+="Wot:"+test+" NOT PASSED\n";
                }
            }catch(err){
                console.log("Wot:"+test+"->Err: ",err);
                res+="Wot:"+test+" NOT PASSED\n";
            }
        }

        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  Wot-> passed "+passed+"/"+tot+" \n" +res;

    } else {
        return "";
    }
}


const queryParserTest = async () => {
    if (process.argv[2] === "parser" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#               QUERY PARSER            #");
        console.log("####################TEST#################");
        console.log("\n");

    
          
        var res = "";
        var tot = 0;
        var passed = 0;

        for (var test in QueryParserTest) {
            try{
                const ris= await QueryParserTest[test]();
                passed+=ris.passed;
                tot+=ris.tot;
            }catch(err){
                tot++;//this is not equal to "tot+=ris.tot;" (but is ok)
                console.log("QueryParser:"+test+"->Err: ",err);
                res+="QueryParser:"+test+" NOT PASSED\n";
            }
        }

        globalTestTOT+=tot;
        globalTestPassed+=passed;
        return"######  QueryParser-> passed "+passed+"/"+tot+" \n" +res;
    }
    return"";
}



const runAllTest = async function () {
    const startAt = Date.now();
    var  totResTests = "\n\n\n\n"+
    "###############################################\n"+
    "<---------------------RESULTS----------------->\n"+
    "###############################################\n\n";    
    totResTests+=await queryParserTest();
    totResTests+=await ecnodingTest();
    totResTests+=await consOnNumberTest();
    totResTests+=await consOnStringTest();
    totResTests+=await consOnBoolTest();
    totResTests+=await wotTest();
    totResTests+=await useCaseTest();
    const endAt =Date.now();
    console.log(totResTests);
    console.log("\n");
    console.log("###############################################");
    console.log("#TESTS FINISHED in "+(endAt-startAt)+"ms");
    console.log("#TOTAL PASSED "+globalTestPassed+" on "+globalTestTOT);
    console.log("#############################################"); 
    

}

runAllTest();

//WotTest.test_02(()=>{});