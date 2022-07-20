//All the test MUST be async function without args
import Config from "../src/const/Config";
import QueryParser from "../src/component/QueryParser";
import { IPrefix } from "../src/model/IQuery";
import {
    query_getter_01,
    query_getter_02,
    query_getter_03,
    query_getter_04,
    query_getter_05,
    query_invalid_01, query_invalid_02, query_invalid_03, query_invalid_04, query_invalid_05, query_invalid_06, query_invalid_07, query_invalid_08,
    query_invalid_09,
    query_valid_01, query_valid_02, query_valid_03, query_valid_04,
    query_valid_05, query_valid_06, query_valid_07, query_valid_08, query_valid_09, query_valid_10, query_valid_11
} from "./TestQueries";

const GEOFILTER_UNIT_IS_URI = Config.GEOFILTER_UNIT_IS_URI;
const PROPERTY_IDENTIFIER_IS_URI = Config.PROPERTY_IDENTIFIER_IS_URI;
const PROPERTY_UNIT_IS_URI = Config.PROPERTY_UNIT_IS_URI;

const test_01 = async function () :Promise<{tot:number,passed:number}> {
    console.log("\n##########   test_01: Testing valid queries  ##########");
    let total_tests = 0;
    let total_passed = 0;
    if (PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser1_valid: QueryParser = new QueryParser(query_valid_01);
        if (parser1_valid.isValid()) {console.log("Passed query_1"); total_passed++;}
        else console.log("Failed query_1");
        total_tests++;

        const parser2_valid: QueryParser = new QueryParser(query_valid_02);
        if (parser2_valid.isValid()){ console.log("Passed query_2"); total_passed++; }
        else console.log("Failed query_2");
        total_tests++;

        const parser3_valid: QueryParser = new QueryParser(query_valid_03);
        if (parser3_valid.isValid()){ console.log("Passed query_3"); total_passed++; }
        else console.log("Failed query_3");
        total_tests++;

        const parser4_valid: QueryParser = new QueryParser(query_valid_04);
        if (parser4_valid.isValid()){ console.log("Passed query_4"); total_passed++; }
        else console.log("Failed query_4");
        total_tests++;

        const parser5_valid: QueryParser = new QueryParser(query_valid_05);
        if (parser5_valid.isValid()){ console.log("Passed query_5"); total_passed++; }
        else console.log("Failed query_5");
        total_tests++;

        const parser6_valid: QueryParser = new QueryParser(query_valid_06);
        if (parser6_valid.isValid()){ console.log("Passed query_6"); total_passed++; }
        else console.log("Failed query_6");
        total_tests++;

        const parser7_valid: QueryParser = new QueryParser(query_valid_07);
        if (parser7_valid.isValid()){ console.log("Passed query_7"); total_passed++; }
        else console.log("Failed query_7");
        total_tests++;

        const parser8_valid: QueryParser = new QueryParser(query_valid_08);
        if (parser8_valid.isValid()){ console.log("Passed query_8"); total_passed++; }
        else console.log("Failed query_8");
        total_tests++;

    }

    if (!PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser9_valid: QueryParser = new QueryParser(query_valid_09);
        if (parser9_valid.isValid()){ console.log("Passed query_9"); total_passed++; }
        else console.log("Failed query_9");
        total_tests++;
    }

    if (!PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI && PROPERTY_IDENTIFIER_IS_URI) {
        const parser10_valid: QueryParser = new QueryParser(query_valid_10);
        if (parser10_valid.isValid()){ console.log("Passed query_10"); total_passed++; }
        else console.log("Failed query_10");
        total_tests++;
    }

    if (!GEOFILTER_UNIT_IS_URI && PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI) {
        const parser11_valid: QueryParser = new QueryParser(query_valid_11);
        if (parser11_valid.isValid()){ console.log("Passed query_11"); total_passed++; }
        else console.log("Failed query_11");
        total_tests++;
    }

    console.log ("passed tests:" + total_passed + "/" + total_tests);

    return {tot:total_tests,passed:total_passed};
}



const test_02 = async function () :Promise<{tot:number,passed:number}>{
    console.log("\n##########   test_02: Testing invalid queries  ##########");

    let total_tests = 0;
    let total_passed = 0;

    if (PROPERTY_IDENTIFIER_IS_URI && PROPERTY_UNIT_IS_URI && GEOFILTER_UNIT_IS_URI) {
        const parser1_invalid: QueryParser = new QueryParser(query_invalid_01);
        if (!parser1_invalid.isValid()){ console.log("Passed query_1"); total_passed++; }
        else console.log("Failed query_1");
        total_tests++;

        const parser2_invalid: QueryParser = new QueryParser(query_invalid_02);
        if (!parser2_invalid.isValid()){ console.log("Passed query_2"); total_passed++; }
        else console.log("Failed query_2");
        total_tests++;

        const parser3_invalid: QueryParser = new QueryParser(query_invalid_03);
        if (!parser3_invalid.isValid()){ console.log("Passed query_3"); total_passed++; }
        else console.log("Failed query_3");
        total_tests++;

        const parser4_invalid: QueryParser = new QueryParser(query_invalid_04);
        if (!parser4_invalid.isValid()){ console.log("Passed query_4"); total_passed++; }
        else console.log("Failed query_4");
        total_tests++;

        const parser5_invalid: QueryParser = new QueryParser(query_invalid_05);
        if (!parser5_invalid.isValid()){ console.log("Passed query_5"); total_passed++; }
        else console.log("Failed query_5");
        total_tests++;

        const parser6_invalid: QueryParser = new QueryParser(query_invalid_06);
        if (!parser6_invalid.isValid()){ console.log("Passed query_6"); total_passed++; }
        else console.log("Failed query_6");
        total_tests++;

        const parser7_invalid: QueryParser = new QueryParser(query_invalid_07);
        if (!parser7_invalid.isValid()){ console.log("Passed query_7"); total_passed++; }
        else console.log("Failed query_7");
        total_tests++;

        const parser8_invalid: QueryParser = new QueryParser(query_invalid_08);
        if (!parser8_invalid.isValid()){ console.log("Passed query_8"); total_passed++; }
        else console.log("Failed query_8");
        total_tests++;

        const parser9_invalid: QueryParser = new QueryParser(query_invalid_09);
        if (!parser9_invalid.isValid()){ console.log("Passed query_9"); total_passed++; }
        else console.log("Failed query_9");
        total_tests++;
    }

    console.log("passed tests:" + total_passed + "/" + total_tests);

    return {tot:total_tests,passed:total_passed};

}

const test_03 = async function () :Promise<{tot:number,passed:number}> {
    console.log("\n##########   test_03: Testing getters function ##########");

    let total_tests = 0;
    let total_passed = 0;

    const parser1_getter: QueryParser = new QueryParser(query_getter_01);
    if (parser1_getter.isAskingForNumber()){ console.log("Test on isAskingForNumber function: passed"); total_passed++; }
    else console.log("Test on isAskingForNumber function: failed");
    total_tests++;

    const parser2_getter: QueryParser = new QueryParser(query_getter_02);
    if (parser2_getter.isAskingForNumber()){ console.log("Test on isAskingForNumber function: passed"); total_passed++; }
    else console.log("Test on isAskingForNumber function: failed");
    total_tests++;

    const parser3_getter: QueryParser = new QueryParser(query_getter_03);
    if (parser3_getter.isAskingForBoolean()){ console.log("Test on isAskingForBoolean function: passed"); total_passed++; }
    else console.log("Test on isAskingForBoolean function: failed");
    total_tests++;

    const parser4_getter: QueryParser = new QueryParser(query_getter_04);
    if (parser4_getter.isAskingForString()){ console.log("Test on isAskingForString function: passed"); total_passed++; }
    else console.log("Test on isAskingForString function: failed");
    total_tests++;

    //getType
    if (parser1_getter.getType() == 1){ console.log("Test on getType function: passed"); total_passed++; }
    else console.log("Test on getType function: failed");
    total_tests++;

    if (parser2_getter.getType() == 0){ console.log("Test on getType function: passed"); total_passed++; }
    else console.log("Test on getType function: failed");
    total_tests++;

    if (parser3_getter.getType() == 2){ console.log("Test on getType function: passed"); total_passed++; }
    else console.log("Test on getType function: failed");
    total_tests++;

    if (parser4_getter.getType() == 3){ console.log("Test on getType function: passed"); total_passed++; }
    else console.log("Test on getType function: failed");
    total_tests++;

    //getJsonPath
    const parser5_getter: QueryParser = new QueryParser(query_getter_05);
    if (parser5_getter.getJsonPath() == "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"){ console.log("Test on getJsonPath function: passed"); total_passed++; }
    else console.log("Test on getJsonPath function: failed");
    total_tests++;

    //test getPrefixList
    const CorrectPrefix: IPrefix[] = [{ abbreviation: "desmo", completeURI: "https://desmo.vaimee.it/" }, { abbreviation: "qudt", completeURI: "http://qudt.org/schema/qudt/" }, { abbreviation: "onto", completeURI: "http://onto.org/ontologies/base/" }];
    const parser6_getter: QueryParser = new QueryParser(query_getter_05);
    if (PrefixEqual(parser6_getter.getPrefixList(), CorrectPrefix)){ console.log("Test on getJsonPath function: passed"); total_passed++; }
    else console.log("Test on getJsonPath function: failed");
    total_tests++;

    //test getPropertyIdentifier
    if (parser6_getter.getPropertyIdentifier() == "desmo:OutdoorTemperature"){ console.log("Test on getPropertyIdentifier function: passed"); total_passed++; }
    else console.log("Test on getPropertyIdentifier function: failed");
    total_tests++;

    if (parser6_getter.getPropertyUnit() == "qudt:DEG_C"){ console.log("Test on getPropertyUnit function: passed"); total_passed++; }
    else console.log("Test on getPropertyUnit function: failed");
    total_tests++;

    if (parser6_getter.getPropertyDatatype() == 1){ console.log("Test on getPropertyDatatype function: passed"); total_passed++; }
    else console.log("Test on getPropertyDatatype function: failed");
    total_tests++;

    console.log ("passed tests:" + total_passed + "/" + total_tests);

    return {tot:total_tests,passed:total_passed};
}

function PrefixEqual(a: IPrefix[] | null, b: IPrefix[] | null): boolean {
    if (a != null && b != null && a != undefined && b != undefined) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val.abbreviation == b[index].abbreviation && val.completeURI == b[index].completeURI);

    }
    return false;
}

export default {
    test_01,
    test_02,
    test_03
}