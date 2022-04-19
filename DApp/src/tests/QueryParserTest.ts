//All the test MUST be async function without args

import QueryParser from "../component/queryParser";
import { 
    query_invalid_01,  query_invalid_02,  query_invalid_03,
    query_valid_01, query_valid_02, query_valid_03, query_valid_04,
    query_valid_05,query_valid_06 
} from "./TestQueries";



const test_01 =async function(){
    console.log("\n##########   test_01: Testing valid queries  ##########");


    const parser1_valid : QueryParser= new QueryParser(query_valid_01);
    if (parser1_valid.isValid()) console.log ("Passed query_1");
    else console.log ("Failed query_1");

    const parser2_valid : QueryParser= new QueryParser(query_valid_02);
    if (parser2_valid.isValid()) console.log ("Passed query_2");
    else console.log ("Failed query_2");

    const parser3_valid : QueryParser= new QueryParser(query_valid_03);
    if (parser3_valid.isValid()) console.log ("Passed query_3");
    else console.log ("Failed query_3");

    const parser4_valid : QueryParser= new QueryParser(query_valid_04);
    if (parser4_valid.isValid()) console.log ("Passed query_4");
    else console.log ("Failed query_4");

    const parser5_valid : QueryParser= new QueryParser(query_valid_05);
    if (parser5_valid.isValid()) console.log ("Passed query_5");
    else console.log ("Failed query_5");

    const parser6_valid : QueryParser= new QueryParser(query_valid_06);
    if (parser6_valid.isValid()) console.log ("Passed query_6");
    else console.log ("Failed query_6");

    return;
}


const test_02 =async function(){
    console.log("\n##########   test_02: Testing invalid queries  ##########");

    const parser1_invalid : QueryParser= new QueryParser(query_invalid_01);
    if (!parser1_invalid.isValid()) console.log ("Passed query_1");
    else console.log ("Failed query_1");

    const parser2_invalid : QueryParser= new QueryParser(query_invalid_02);
    if (!parser2_invalid.isValid()) console.log ("Passed query_2");
    else console.log ("Failed query_2");

    const parser3_invalid : QueryParser= new QueryParser(query_invalid_03);
    if (!parser3_invalid.isValid()) console.log ("Passed query_3");
    else console.log ("Failed query_3");

    return;
}

export default [
     test_01,
     test_02,
]