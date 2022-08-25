"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestConsNumb_1 = __importDefault(require("./TestConsNumb"));
const TestEncoding_1 = __importDefault(require("./TestEncoding"));
const TestConsStr_1 = __importDefault(require("./TestConsStr"));
const TestConsBool_1 = __importDefault(require("./TestConsBool"));
const UseCaseTest_1 = __importDefault(require("./UseCaseTest"));
const QueryParserTest_1 = __importDefault(require("./QueryParserTest"));
const WotTest_1 = __importDefault(require("./WotTest"));
const TestUtils_1 = __importDefault(require("./TestUtils"));
var globalTestTOT = 0;
var globalTestPassed = 0;
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
        if (await TestUtils_1.default.assertTest("Consensus_on_number:test_01", TestConsNumb_1.default.test_01, TestUtils_1.default.numberValidator)) {
            passed++;
            res += "Consensus_on_number:test_01 PASSED\n";
        }
        else {
            res += "Consensus_on_number:test_01 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_number:test_02", TestConsNumb_1.default.test_02, TestUtils_1.default.numberValidator)) {
            passed++;
            res += "Consensus_on_number:test_02 PASSED\n";
        }
        else {
            res += "Consensus_on_number:test_02 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_number:test_03", TestConsNumb_1.default.test_03, TestUtils_1.default.numberValidator)) {
            passed++;
            res += "Consensus_on_number:test_03 PASSED\n";
        }
        else {
            res += "Consensus_on_number:test_03 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_number:test_04", TestConsNumb_1.default.test_04, TestUtils_1.default.numberValidator)) {
            passed++;
            res += "Consensus_on_number:test_04 PASSED\n";
        }
        else {
            res += "Consensus_on_number:test_04 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_number:test_05", TestConsNumb_1.default.test_05, TestUtils_1.default.numberValidator)) {
            passed++;
            res += "Consensus_on_number:test_05 PASSED\n";
        }
        else {
            res += "Consensus_on_number:test_05 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  Consensus_on_number-> passed " + passed + "/" + tot + " \n" + res;
    }
    else {
        return "";
    }
};
const consOnBoolTest = async () => {
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
        if (await TestUtils_1.default.assertTest("Consensus_on_bool:test_01", TestConsBool_1.default.test_01, TestUtils_1.default.boolValidator)) {
            passed++;
            res += "Consensus_on_bool:test_01 PASSED\n";
        }
        else {
            res += "Consensus_on_bool:test_01 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  Consensus_on_bool-> passed " + passed + "/" + tot + " \n" + res;
    }
    else {
        return "";
    }
};
const consOnStringTest = async () => {
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
        if (await TestUtils_1.default.assertTest("Consensus_on_str:test_01", TestConsStr_1.default.test_01, TestUtils_1.default.strValidator)) {
            passed++;
            res += "Consensus_on_str:test_01 PASSED\n";
        }
        else {
            res += "Consensus_on_str:test_01 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_str:test_02", TestConsStr_1.default.test_02, TestUtils_1.default.strValidator)) {
            passed++;
            res += "Consensus_on_str:test_02 PASSED\n";
        }
        else {
            res += "Consensus_on_str:test_02 NOT PASSED\n";
        }
        tot++;
        if (await TestUtils_1.default.assertTest("Consensus_on_str:test_03", TestConsStr_1.default.test_03, TestUtils_1.default.strValidator)) {
            passed++;
            res += "Consensus_on_str:test_03 PASSED\n";
        }
        else {
            res += "Consensus_on_str:test_03 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  Consensus_on_str-> passed " + passed + "/" + tot + " \n" + res;
    }
    else {
        return "";
    }
};
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
        tot++;
        try {
            if (await TestEncoding_1.default.test_01()) {
                passed++;
                res += "Encoding.test_01 PASSED\n";
            }
            else {
                res += "Encoding.test_01 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_01->Err: ", err);
            res += "Encoding: test_01 NOT PASSED\n";
        }
        tot++;
        try {
            if (await TestEncoding_1.default.test_02()) {
                passed++;
                res += "Encoding.test_02 PASSED\n";
            }
            else {
                res += "Encoding.test_02 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_02->Err: ", err);
            res += "Encoding: test_02 NOT PASSED\n";
        }
        tot++;
        try {
            if (await TestEncoding_1.default.test_03()) {
                passed++;
                res += "Encoding.test_03 PASSED\n";
            }
            else {
                res += "Encoding.test_03 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_03->Err: ", err);
            res += "Encoding: test_03 NOT PASSED\n";
        }
        tot++;
        try {
            if (await TestEncoding_1.default.test_04()) {
                passed++;
                res += "Encoding.test_04 PASSED\n";
            }
            else {
                res += "Encoding.test_04 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_04->Err: ", err);
            res += "Encoding: test_04 NOT PASSED\n";
        }
        tot++;
        try {
            if (await TestEncoding_1.default.test_05()) {
                passed++;
                res += "Encoding.test_05 PASSED\n";
            }
            else {
                res += "Encoding.test_05 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_05->Err: ", err);
            res += "Encoding: test_05 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        tot++;
        try {
            if (await TestEncoding_1.default.test_06()) {
                passed++;
                res += "Encoding.test_06 PASSED\n";
            }
            else {
                res += "Encoding.test_06 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_06->Err: ", err);
            res += "Encoding: test_06 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        tot++;
        try {
            if (await TestEncoding_1.default.test_07()) {
                passed++;
                res += "Encoding.test_07 PASSED\n";
            }
            else {
                res += "Encoding.test_07 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Encoding: test_07->Err: ", err);
            res += "Encoding: test_07 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  Encoding-> passed " + passed + "/" + tot + " \n" + res;
    }
    return "";
};
const useCaseTest = async () => {
    if (process.argv[2] === "usecase" || process.argv[2] === undefined) {
        console.log("\n\n");
        console.log("####################TEST#################");
        console.log("#                 USE CASE              #");
        console.log("####################TEST#################");
        console.log("\n");
        var res = "";
        var tot = 0;
        var passed = 0;
        //     tot++;
        //     if(await UseCaseTest.test_01()){
        //         passed++;
        //         res+="UseCase-Linksmart PASSED\n";
        //     }else{
        //         res+="UseCase-Linksmart NOT PASSED\n";
        //     }
        //     globalTestTOT+=tot;
        //     globalTestPassed+=passed;
        //           return"######  UseCase-> passed "+passed+"/"+tot+" \n" +res;
        // }else if(process.argv[2] === "zion"){
        tot++;
        if (await UseCaseTest_1.default.test_02()) {
            passed++;
            res += "UseCase-Zion PASSED\n";
        }
        else {
            res += "UseCase-Zion NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        tot++;
        if (await UseCaseTest_1.default.test_03()) {
            passed++;
            res += "UseCase-rejext_1 PASSED\n";
        }
        else {
            res += "UseCase-rejext_1 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        tot++;
        if (await UseCaseTest_1.default.test_04()) {
            passed++;
            res += "UseCase-rejext_2 PASSED\n";
        }
        else {
            res += "UseCase-rejext_2 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  UseCase-> passed " + passed + "/" + tot + " \n" + res;
        // } else {
        //     return "";
    }
};
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
        tot++;
        try {
            if (await WotTest_1.default.test_01()) {
                passed++;
                res += "Wot: test_01 PASSED\n";
            }
            else {
                res += "Wot: test_01 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_01->Err: ", err);
            res += "Wot: test_01NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_03()) {
                passed++;
                res += "Wot: test_03 PASSED\n";
            }
            else {
                res += "Wot: test_03 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_03->Err: ", err);
            res += "Wot: test_03 NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_04()) {
                passed++;
                res += "Wot: test_04 PASSED\n";
            }
            else {
                res += "Wot: test_04 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_04->Err: ", err);
            res += "Wot: test_04 NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_05()) {
                passed++;
                res += "Wot: test_05 PASSED\n";
            }
            else {
                res += "Wot: test_05 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_05->Err: ", err);
            res += "Wot: test_05NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_06()) {
                passed++;
                res += "Wot: test_06 PASSED\n";
            }
            else {
                res += "Wot: test_06 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_06->Err: ", err);
            res += "Wot: test_06NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_07()) {
                passed++;
                res += "Wot: test_07 PASSED\n";
            }
            else {
                res += "Wot: test_07 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_07->Err: ", err);
            res += "Wot: test_07 NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_08()) {
                passed++;
                res += "Wot: test_08 PASSED\n";
            }
            else {
                res += "Wot: test_08 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_08->Err: ", err);
            res += "Wot: test_08 NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_09()) {
                passed++;
                res += "Wot: test_09 PASSED\n";
            }
            else {
                res += "Wot: test_09 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_09->Err: ", err);
            res += "Wot: test_09 NOT PASSED\n";
        }
        tot++;
        try {
            if (await WotTest_1.default.test_10()) {
                passed++;
                res += "Wot: test_10 PASSED\n";
            }
            else {
                res += "Wot: test_10 NOT PASSED\n";
            }
        }
        catch (err) {
            console.log("Wot: test_10->Err: ", err);
            res += "Wot: test_10 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  Wot-> passed " + passed + "/" + tot + " \n" + res;
    }
    else {
        return "";
    }
};
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
        try {
            const ris = await QueryParserTest_1.default.test_01();
            passed += ris.passed;
            tot += ris.tot;
        }
        catch (err) {
            tot++; //this is not equal to "tot+=ris.tot;" (but is ok)
            console.log("QueryParser: test_01->Err: ", err);
            res += "QueryParser: test_01 NOT PASSED\n";
        }
        try {
            const ris = await QueryParserTest_1.default.test_02();
            passed += ris.passed;
            tot += ris.tot;
        }
        catch (err) {
            tot++; //this is not equal to "tot+=ris.tot;" (but is ok)
            console.log("QueryParser: test_02->Err: ", err);
            res += "QueryParser: test_02 NOT PASSED\n";
        }
        try {
            const ris = await QueryParserTest_1.default.test_03();
            passed += ris.passed;
            tot += ris.tot;
        }
        catch (err) {
            tot++; //this is not equal to "tot+=ris.tot;" (but is ok)
            console.log("QueryParser: test_03->Err: ", err);
            res += "QueryParser: test_03 NOT PASSED\n";
        }
        globalTestTOT += tot;
        globalTestPassed += passed;
        return "######  QueryParser-> passed " + passed + "/" + tot + " \n" + res;
    }
    return "";
};
const runAllTest = async function () {
    const startAt = Date.now();
    var totResTests = "\n\n\n\n" +
        "###############################################\n" +
        "<---------------------RESULTS----------------->\n" +
        "###############################################\n\n";
    totResTests += await queryParserTest();
    totResTests += await ecnodingTest();
    totResTests += await consOnNumberTest();
    totResTests += await consOnStringTest();
    totResTests += await consOnBoolTest();
    totResTests += await wotTest();
    totResTests += await useCaseTest();
    const endAt = Date.now();
    console.log(totResTests);
    console.log("\n");
    console.log("###############################################");
    console.log("#TESTS FINISHED in " + (endAt - startAt) + "ms");
    console.log("#TOTAL PASSED " + globalTestPassed + " on " + globalTestTOT);
    console.log("#############################################");
};
runAllTest();
//WotTest.test_02(()=>{});
