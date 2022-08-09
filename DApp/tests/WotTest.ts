import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription, InteractionOutput } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';

const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";
const prop = "latitude";

const ZION = "http://localhost:3000";
// function delay(ms: number) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

//jsonpath standard:
//https://datatracker.ietf.org/doc/html/draft-ietf-jsonpath-base


const test_01 = async function (): Promise<boolean> {
    var request_path =ZION + path_getAll;
    try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        const WoThelpers = new Helpers(servient);
        const wot = await servient.start();
        console.log("request_path", request_path);
        const tds = (await axios.get(request_path)).data;
        var selectedTD = null;
        for (let x in tds) {
            if (tds[x].title !== undefined && tds[x].title !== "servient") {
                selectedTD = tds[x];
                break;
            }
        }
        if (selectedTD === null) {
            throw new Error("Not valid TD found!");
        }
        const thing = await wot.consume(selectedTD as ThingDescription);
        const reader = await thing.readProperty(prop);
        //await delay(5000); //<-----------------------------------------DECCOMENT FOR SEE THE BUG
        console.log("Here we have the console.log");
        const ris = await reader.value();
        console.log("Here we haven't the console.log and for some reason the script exit with no err (skypping the catch too).");
        console.log("WotTest: ", ris);
        return ris !== null && ris !== undefined && ris.toString().length > 0;
    } catch (err) {
        console.log("WotTest: ResolveTD error 1:", err);
    }
    return false;
}


// const test_02 = async function (): Promise<boolean> {
//     const td_url = "http://plugfest.thingweb.io:8083/counter";
//     try {
//         const servient = new Servient();
//         servient.addClientFactory(new HttpClientFactory(undefined));
//         const wot = await servient.start();
//         const td = (await axios.get(td_url)).data;
//         const thing = await wot.consume(td as ThingDescription);
//         console.log("BEFORE readProperty");
//         const reader = await thing.readProperty("count");
//         console.log("AFTER readProperty");
//         await delay(5000); //<--DECCOMENT FOR SEE THE BUG
//         console.log("Here we have the console.log");
//         console.log("BEFORE value");
//         const ris = await reader.value();
//         console.log("AFTER value");
//         console.log("Here we haven't the console.log and for some reason, the script exit with no error (skipping the catch too).");
//         console.log("WotTest result: ", ris);
//         return ris !== null && ris !== undefined && ris.toString().length > 0;
//     } catch (err) {
//         console.log("WotTest: ResolveTD error 1:", err);
//         return false;
//     }
// }

const genericGetPropFromTD = async function (td_url: string, prop: string): Promise<boolean> {
    try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        const wot = await servient.start();
        const td = (await axios.get(td_url)).data;
        const thing = await wot.consume(td as ThingDescription);
        const reader = await thing.readProperty(prop);
        const ris = await reader.value();
        return ris !== null && ris !== undefined && ris.toString().length > 0;
    } catch (err) {
        console.log("WotTest: ResolveTD error 1:", err);
        return false;
    }
}

const test_03 = async function (): Promise<boolean> {
    const td_url = "http://localhost:8080/temp_01";
    const lon = await genericGetPropFromTD(td_url, "longitude");
    const lat = await genericGetPropFromTD(td_url, "latitude");
    const value = await genericGetPropFromTD(td_url, "value");
    return lon && lat && value;
}

const test_04 = async function (): Promise<boolean> {
    const td_url = "http://localhost:8080/stopligth_01";
    const lon = await genericGetPropFromTD(td_url, "longitude");
    const lat = await genericGetPropFromTD(td_url, "latitude");
    const value = await genericGetPropFromTD(td_url, "value");
    return lon && lat && value;
}

const test_05 = async function (): Promise<boolean> {
    const td_url = "http://plugfest.thingweb.io:8083/counter";
    try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        const wot = await servient.start();
        const td = (await axios.get(td_url)).data;
        const thing = await wot.consume(td as ThingDescription);
        const reader = await thing.readAllProperties();
        const ris = await reader.keys.length;
        // console.log("test_05.ris",ris);
        return ris >= 0;
    } catch (err) {
        console.log("WotTest: ResolveTD error 1:", err);
        return false;
    }
}

const test_06= async function (): Promise<boolean> {
    const td_url = "http://plugfest.thingweb.io:8083/counter";
    const lastChange = await genericGetPropFromTD(td_url, "lastChange");
    const count = await genericGetPropFromTD(td_url, "count");
    const redDotImage = await genericGetPropFromTD(td_url, "redDotImage");
    const countAsImage = await genericGetPropFromTD(td_url, "countAsImage");
    return lastChange && count && redDotImage && countAsImage;
}



const genericZionQuery = async function (query:string): Promise<{}[]|null> {
    var request_path =ZION + path_jsonPathQuery+query;
    try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        console.log("request_path", request_path);
        return (await axios.get(request_path)).data;
    } catch (err) {
        console.log("WotTest: Zion query error:", err);
    }
    return null;
}

const test_07 = async function (): Promise<boolean> {
    const ris =await genericZionQuery("$[?(@['type']=='ControlUnit')]");
    // console.log("test_07.ris",ris);
    return ris?.length!==undefined &&  ris?.length>=3;
}

const test_08 = async function (): Promise<boolean> {
    const ris = await genericZionQuery("$.id");
    // console.log("test_08.ris",ris);
    return ris!==null && ris!==undefined && ris.length>0;
}

const test_09 = async function (): Promise<boolean> {
    const ris = await genericZionQuery("$[*]['longitude']");
    // console.log("test_09.ris",ris);
    return ris!==null && ris!==undefined && ris.length>0;
}

const test_10 = async function (): Promise<boolean> {
    const ris =await genericZionQuery('$.title[?@=="temp_03"]');
    // console.log("test_10.ris",ris);
    return ris!==null && ris!==undefined && ris.length===1 && ris[0]==="temp_03";
}

const test_11 = async function (): Promise<boolean> {
    const ris =await genericZionQuery('$.forms.href[?@=="http://localhost:8080/servient/all/properties"]');
    return ris!==null && ris!==undefined;
}

const test_12 = async function (): Promise<boolean> {
    const ris =await genericZionQuery('$.forms.href');
    return ris!==null && ris!==undefined && ris.length>28;
}

const test_13 = async function (): Promise<boolean> {
    const encodedQuery = encodeURIComponent("$.forms[?@.href=~'http://(.)+/stopligth_01']");
    //console.log("test_13.encodedQuery",encodedQuery);
    const ris =await genericZionQuery(encodedQuery);
    // console.log("test_13.encodedQuery.ris",ris);
    return ris!==null && ris!==undefined && ris.length>=4;
}


//$.forms.href[?@=="http://localhost:8080/servient/all/properties"] count 4
//$.forms.href count 28
//$.forms.href[?@=~'http://(.)+/stopligth_01']

export default {
    test_01,
    //test_02, 
    test_03,
    test_04,
    test_05,
    test_06,
    test_07,
    test_08,
    test_09,
    test_10,
    test_11,
    test_12,
    test_13
}