//All the test MUST be async function without args

import QueryParser from "../component/QueryParser";
import { IPrefix } from "../model/IQuery";
import {
    query_getter_01,
    query_getter_02,
    query_getter_03,
    query_getter_04,
    query_getter_05,
    query_invalid_01, query_invalid_02, query_invalid_03, query_invalid_04, query_invalid_05, query_invalid_06, query_invalid_07, query_invalid_08,
    query_invalid_09,
    query_valid_01, query_valid_02, query_valid_03, query_valid_04,
    query_valid_05, query_valid_06, query_valid_07, query_valid_08,
} from "./TestQueries";



const test_01 = async function () {
    console.log("\n##########   test_01: Testing valid queries  ##########");


    const parser1_valid: QueryParser = new QueryParser(query_valid_01);
    if (parser1_valid.isValid()) console.log("Passed query_1");
    else console.log("Failed query_1");

    const parser2_valid: QueryParser = new QueryParser(query_valid_02);
    if (parser2_valid.isValid()) console.log("Passed query_2");
    else console.log("Failed query_2");

    const parser3_valid: QueryParser = new QueryParser(query_valid_03);
    if (parser3_valid.isValid()) console.log("Passed query_3");
    else console.log("Failed query_3");

    const parser4_valid: QueryParser = new QueryParser(query_valid_04);
    if (parser4_valid.isValid()) console.log("Passed query_4");
    else console.log("Failed query_4");

    const parser5_valid: QueryParser = new QueryParser(query_valid_05);
    if (parser5_valid.isValid()) console.log("Passed query_5");
    else console.log("Failed query_5");

    const parser6_valid: QueryParser = new QueryParser(query_valid_06);
    if (parser6_valid.isValid()) console.log("Passed query_6");
    else console.log("Failed query_6");

    const parser7_valid: QueryParser = new QueryParser(query_valid_07);
    if (parser7_valid.isValid()) console.log("Passed query_7");
    else console.log("Failed query_7");

    const parser8_valid: QueryParser = new QueryParser(query_valid_08);
    if (parser8_valid.isValid()) console.log("Passed query_8");
    else console.log("Failed query_8");


    return;
}



const test_02 = async function () {
    console.log("\n##########   test_02: Testing invalid queries  ##########");

    const parser1_invalid: QueryParser = new QueryParser(query_invalid_01);
    if (!parser1_invalid.isValid()) console.log("Passed query_1");
    else console.log("Failed query_1");

    const parser2_invalid: QueryParser = new QueryParser(query_invalid_02);
    if (!parser2_invalid.isValid()) console.log("Passed query_2");
    else console.log("Failed query_2");

    const parser3_invalid: QueryParser = new QueryParser(query_invalid_03);
    if (!parser3_invalid.isValid()) console.log("Passed query_3");
    else console.log("Failed query_3");

    const parser4_invalid: QueryParser = new QueryParser(query_invalid_04);
    if (!parser4_invalid.isValid()) console.log("Passed query_4");
    else console.log("Failed query_4");

    const parser5_invalid: QueryParser = new QueryParser(query_invalid_05);
    if (!parser5_invalid.isValid()) console.log("Passed query_5");
    else console.log("Failed query_5");

    const parser6_invalid: QueryParser = new QueryParser(query_invalid_06);
    if (!parser6_invalid.isValid()) console.log("Passed query_6");
    else console.log("Failed query_6");

    const parser7_invalid: QueryParser = new QueryParser(query_invalid_07);
    if (!parser7_invalid.isValid()) console.log("Passed query_7");
    else console.log("Failed query_7");

    const parser8_invalid: QueryParser = new QueryParser(query_invalid_08);
    if (!parser8_invalid.isValid()) console.log("Passed query_8");
    else console.log("Failed query_8");

    const parser9_invalid: QueryParser = new QueryParser(query_invalid_09);
    if (!parser9_invalid.isValid()) console.log("Passed query_9");
    else console.log("Failed query_9");




    return;
}

const test_03 = async function () {
    console.log("\n##########   test_03: Testing getters function ##########");

    const parser1_getter: QueryParser = new QueryParser(query_getter_01);
    if (parser1_getter.isAskingForNumber()) console.log("Test on isAskingForNumber function: passed");
    else console.log("Test on isAskingForNumber function: failed");

    const parser2_getter: QueryParser = new QueryParser(query_getter_02);
    if (parser2_getter.isAskingForNumber()) console.log("Test on isAskingForNumber function: passed");
    else console.log("Test on isAskingForNumber function: failed");

    const parser3_getter: QueryParser = new QueryParser(query_getter_03);
    if (parser3_getter.isAskingForBoolean()) console.log("Test on isAskingForBoolean function: passed");
    else console.log("Test on isAskingForBoolean function: failed");

    const parser4_getter: QueryParser = new QueryParser(query_getter_04);
    if (parser4_getter.isAskingForString()) console.log("Test on isAskingForString function: passed");
    else console.log("Test on isAskingForString function: failed");

    //getType
    if (parser1_getter.getType() == 1) console.log("Test on getType function: passed");
    else console.log("Test on getType function: failed");

    if (parser2_getter.getType() == 0) console.log("Test on getType function: passed");
    else console.log("Test on getType function: failed");

    if (parser3_getter.getType() == 2) console.log("Test on getType function: passed");
    else console.log("Test on getType function: failed");

    if (parser4_getter.getType() == 3) console.log("Test on getType function: passed");
    else console.log("Test on getType function: failed");

    //getJsonPath
    const parser5_getter: QueryParser = new QueryParser(query_getter_05);
    if (parser5_getter.getJsonPath() == "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]") console.log("Test on getJsonPath function: passed");
    else console.log("Test on getJsonPath function: failed");

    //test getPrefixList
    const CorrectPrefix: IPrefix[] = [{ abbreviation: "desmo", completeURI: "https://desmo.vaimee.it/" }, { abbreviation: "qudt", completeURI: "http://qudt.org/schema/qudt/" }, { abbreviation: "onto", completeURI: "http://onto.org/ontologies/base/" }];
    const parser6_getter: QueryParser = new QueryParser(query_getter_05);
    if (PrefixEqual(parser6_getter.getPrefixList(), CorrectPrefix)) console.log("Test on getJsonPath function: passed");
    else console.log("Test on getJsonPath function: failed");

    //test getPropertyIdentifier
    if (parser6_getter.getPropertyIdentifier() == "desmo:OutdoorTemperature") console.log("Test on getPropertyIdentifier function: passed");
    else console.log("Test on getPropertyIdentifier function: failed");

    if (parser6_getter.getPropertyUnit() == "qudt:DEG_C") console.log("Test on getPropertyUnit function: passed");
    else console.log("Test on getPropertyUnit function: failed");

    if (parser6_getter.getPropertyDatatype() == 1) console.log("Test on getPropertyDatatype function: passed");
    else console.log("Test on getPropertyDatatype function: failed");

    return;
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

export default [
    test_01,
    test_02,
    test_03
]