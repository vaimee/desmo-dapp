"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//All the test MUST be async function without args
const Config_1 = __importDefault(require("../src/const/Config"));
const QueryParser_1 = __importDefault(require("../src/component/QueryParser"));
const TestQueries_1 = require("./TestQueries");
const GEOFILTER_UNIT_IS_URI = Config_1.default.GEOFILTER_UNIT_IS_URI;
const PROPERTY_IDENTIFIER_IS_URI = Config_1.default.PROPERTY_IDENTIFIER_IS_URI;
const PROPERTY_UNIT_IS_URI = Config_1.default.PROPERTY_UNIT_IS_URI;
const test_01 = async function () {
    console.log("\n##########   test_01: Testing valid queries  ##########");
    let total_tests = 0;
    let total_passed = 0;
    if (PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser1_valid = new QueryParser_1.default(TestQueries_1.query_valid_01);
        parser1_valid.parse();
        if (parser1_valid.isValid()) {
            console.log("Passed query_1");
            total_passed++;
        }
        else
            console.log("Failed query_1");
        total_tests++;
        const parser2_valid = new QueryParser_1.default(TestQueries_1.query_valid_02);
        parser2_valid.parse();
        if (parser2_valid.isValid()) {
            console.log("Passed query_2");
            total_passed++;
        }
        else
            console.log("Failed query_2");
        total_tests++;
        const parser3_valid = new QueryParser_1.default(TestQueries_1.query_valid_03);
        parser3_valid.parse();
        if (parser3_valid.isValid()) {
            console.log("Passed query_3");
            total_passed++;
        }
        else
            console.log("Failed query_3");
        total_tests++;
        const parser4_valid = new QueryParser_1.default(TestQueries_1.query_valid_04);
        parser4_valid.parse();
        if (parser4_valid.isValid()) {
            console.log("Passed query_4");
            total_passed++;
        }
        else
            console.log("Failed query_4");
        total_tests++;
        const parser5_valid = new QueryParser_1.default(TestQueries_1.query_valid_05);
        parser5_valid.parse();
        if (parser5_valid.isValid()) {
            console.log("Passed query_5");
            total_passed++;
        }
        else
            console.log("Failed query_5");
        total_tests++;
        const parser6_valid = new QueryParser_1.default(TestQueries_1.query_valid_06);
        parser6_valid.parse();
        if (parser6_valid.isValid()) {
            console.log("Passed query_6");
            total_passed++;
        }
        else
            console.log("Failed query_6");
        total_tests++;
        const parser7_valid = new QueryParser_1.default(TestQueries_1.query_valid_07);
        parser7_valid.parse();
        if (parser7_valid.isValid()) {
            console.log("Passed query_7");
            total_passed++;
        }
        else
            console.log("Failed query_7");
        total_tests++;
        const parser8_valid = new QueryParser_1.default(TestQueries_1.query_valid_08);
        parser8_valid.parse();
        if (parser8_valid.isValid()) {
            console.log("Passed query_8");
            total_passed++;
        }
        else
            console.log("Failed query_8");
        total_tests++;
    }
    if (!PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser9_valid = new QueryParser_1.default(TestQueries_1.query_valid_09);
        parser9_valid.parse();
        if (parser9_valid.isValid()) {
            console.log("Passed query_9");
            total_passed++;
        }
        else
            console.log("Failed query_9");
        total_tests++;
    }
    if (!PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI && PROPERTY_IDENTIFIER_IS_URI) {
        const parser10_valid = new QueryParser_1.default(TestQueries_1.query_valid_10);
        parser10_valid.parse();
        if (parser10_valid.isValid()) {
            console.log("Passed query_10");
            total_passed++;
        }
        else
            console.log("Failed query_10");
        total_tests++;
    }
    if (!GEOFILTER_UNIT_IS_URI && PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI) {
        const parser11_valid = new QueryParser_1.default(TestQueries_1.query_valid_11);
        parser11_valid.parse();
        if (parser11_valid.isValid()) {
            console.log("Passed query_11");
            total_passed++;
        }
        else
            console.log("Failed query_11");
        total_tests++;
    }
    console.log("passed tests:" + total_passed + "/" + total_tests);
    return { tot: total_tests, passed: total_passed };
};
const test_02 = async function () {
    console.log("\n##########   test_02: Testing invalid queries  ##########");
    let total_tests = 0;
    let total_passed = 0;
    if (PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser1_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_01);
        parser1_invalid.parse();
        if (!parser1_invalid.isValid()) {
            console.log("Passed query_1");
            total_passed++;
        }
        else
            console.log("Failed query_1");
        total_tests++;
        const parser2_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_02);
        parser2_invalid.parse();
        if (!parser2_invalid.isValid()) {
            console.log("Passed query_2");
            total_passed++;
        }
        else
            console.log("Failed query_2");
        total_tests++;
        const parser3_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_03);
        parser3_invalid.parse();
        if (!parser3_invalid.isValid()) {
            console.log("Passed query_3");
            total_passed++;
        }
        else
            console.log("Failed query_3");
        total_tests++;
        const parser4_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_04);
        parser4_invalid.parse();
        if (!parser4_invalid.isValid()) {
            console.log("Passed query_4");
            total_passed++;
        }
        else
            console.log("Failed query_4");
        total_tests++;
        const parser5_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_05);
        parser5_invalid.parse();
        if (!parser5_invalid.isValid()) {
            console.log("Passed query_5");
            total_passed++;
        }
        else
            console.log("Failed query_5");
        total_tests++;
        const parser6_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_06);
        parser6_invalid.parse();
        if (!parser6_invalid.isValid()) {
            console.log("Passed query_6");
            total_passed++;
        }
        else
            console.log("Failed query_6");
        total_tests++;
        const parser7_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_07);
        parser7_invalid.parse();
        if (!parser7_invalid.isValid()) {
            console.log("Passed query_7");
            total_passed++;
        }
        else
            console.log("Failed query_7");
        total_tests++;
        const parser8_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_08);
        parser8_invalid.parse();
        if (!parser8_invalid.isValid()) {
            console.log("Passed query_8");
            total_passed++;
        }
        else
            console.log("Failed query_8");
        total_tests++;
        const parser9_invalid = new QueryParser_1.default(TestQueries_1.query_invalid_09);
        parser9_invalid.parse();
        if (!parser9_invalid.isValid()) {
            console.log("Passed query_9");
            total_passed++;
        }
        else
            console.log("Failed query_9");
        total_tests++;
    }
    console.log("passed tests:" + total_passed + "/" + total_tests);
    return { tot: total_tests, passed: total_passed };
};
const test_03 = async function () {
    console.log("\n##########   test_03: Testing getters function ##########");
    let total_tests = 0;
    let total_passed = 0;
    const parser1_getter = new QueryParser_1.default(TestQueries_1.query_getter_01);
    parser1_getter.parse();
    if (parser1_getter.isAskingForNumber()) {
        console.log("Test on isAskingForNumber function: passed");
        total_passed++;
    }
    else
        console.log("Test on isAskingForNumber function: failed");
    total_tests++;
    const parser2_getter = new QueryParser_1.default(TestQueries_1.query_getter_02);
    parser2_getter.parse();
    if (parser2_getter.isAskingForNumber()) {
        console.log("Test on isAskingForNumber function: passed");
        total_passed++;
    }
    else
        console.log("Test on isAskingForNumber function: failed");
    total_tests++;
    const parser3_getter = new QueryParser_1.default(TestQueries_1.query_getter_03);
    parser3_getter.parse();
    if (parser3_getter.isAskingForBoolean()) {
        console.log("Test on isAskingForBoolean function: passed");
        total_passed++;
    }
    else
        console.log("Test on isAskingForBoolean function: failed");
    total_tests++;
    const parser4_getter = new QueryParser_1.default(TestQueries_1.query_getter_04);
    parser4_getter.parse();
    if (parser4_getter.isAskingForString()) {
        console.log("Test on isAskingForString function: passed");
        total_passed++;
    }
    else
        console.log("Test on isAskingForString function: failed");
    total_tests++;
    //getType
    if (parser1_getter.getType() == 1) {
        console.log("Test on getType function: passed");
        total_passed++;
    }
    else
        console.log("Test on getType function: failed");
    total_tests++;
    if (parser2_getter.getType() == 0) {
        console.log("Test on getType function: passed");
        total_passed++;
    }
    else
        console.log("Test on getType function: failed");
    total_tests++;
    if (parser3_getter.getType() == 2) {
        console.log("Test on getType function: passed");
        total_passed++;
    }
    else
        console.log("Test on getType function: failed");
    total_tests++;
    if (parser4_getter.getType() == 3) {
        console.log("Test on getType function: passed");
        total_passed++;
    }
    else
        console.log("Test on getType function: failed");
    total_tests++;
    //getJsonPath
    const parser5_getter = new QueryParser_1.default(TestQueries_1.query_getter_05);
    parser5_getter.parse();
    if (parser5_getter.getJsonPath() == "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]") {
        console.log("Test on getJsonPath function: passed");
        total_passed++;
    }
    else
        console.log("Test on getJsonPath function: failed");
    total_tests++;
    //test getPrefixList
    const CorrectPrefix = [{ abbreviation: "desmo", completeURI: "https://desmo.vaimee.it/" }, { abbreviation: "qudt", completeURI: "http://qudt.org/schema/qudt/" }, { abbreviation: "onto", completeURI: "http://onto.org/ontologies/base/" }];
    const parser6_getter = new QueryParser_1.default(TestQueries_1.query_getter_05);
    parser6_getter.parse();
    if (PrefixEqual(parser6_getter.getPrefixList(), CorrectPrefix)) {
        console.log("Test on getJsonPath function: passed");
        total_passed++;
    }
    else
        console.log("Test on getJsonPath function: failed");
    total_tests++;
    //test getPropertyIdentifier
    if (parser6_getter.getPropertyIdentifier() == "desmo:OutdoorTemperature") {
        console.log("Test on getPropertyIdentifier function: passed");
        total_passed++;
    }
    else
        console.log("Test on getPropertyIdentifier function: failed");
    total_tests++;
    if (parser6_getter.getPropertyUnit() == "qudt:DEG_C") {
        console.log("Test on getPropertyUnit function: passed");
        total_passed++;
    }
    else
        console.log("Test on getPropertyUnit function: failed");
    total_tests++;
    if (parser6_getter.getPropertyDatatype() == 1) {
        console.log("Test on getPropertyDatatype function: passed");
        total_passed++;
    }
    else
        console.log("Test on getPropertyDatatype function: failed");
    total_tests++;
    console.log("passed tests:" + total_passed + "/" + total_tests);
    return { tot: total_tests, passed: total_passed };
};
function PrefixEqual(a, b) {
    if (a != null && b != null && a != undefined && b != undefined) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val.abbreviation == b[index].abbreviation && val.completeURI == b[index].completeURI);
    }
    return false;
}
exports.default = {
    test_01,
    test_02,
    test_03
};
