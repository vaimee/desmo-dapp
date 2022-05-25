import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription, InteractionOutput } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';
import WotSource from "../src/model/WotSource";
import Directories from "../src/const/Directories";

const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";
const prop = "latitude";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}


// const test_01_async = async function():Promise<void>{
//     var request_path = Directories[0]+ path_getAll;
//     try {
//         const servient = new Servient();
//         servient.addClientFactory(new HttpClientFactory(undefined));
//         const WoThelpers = new Helpers(servient);
//         const wot = await servient.start();
//         console.log("request_path",request_path);
//         const tds = (await axios.get(request_path)).data;
//         var selectedTD = null;
//         for(let x in tds){
//             if(tds[x].title!==undefined && tds[x].title!=="servient"){
//                 selectedTD= tds[x];
//                 break;
//             }
//         }
//         if(selectedTD===null){
//             throw new Error("Not valid TD found!");
//         }
//         const thing = await wot.consume(selectedTD as ThingDescription);
//         const temp = new WotSource(await thing.readProperty(prop),0);
//         //await delay(5000);
//         const v = await temp.ask();
//         console.log("WotTest: ", v);
//     } catch (err) {
//         console.log("WotTest: ResolveTD error 1:", err);
//     }
//     return ;
// }


const test_01_async = async function(){
    var request_path = Directories[0]+ path_getAll;
    try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        const WoThelpers = new Helpers(servient);
        const wot = await servient.start();
        console.log("request_path",request_path);
        const tds = (await axios.get(request_path)).data;
        var selectedTD = null;
        for(let x in tds){
            if(tds[x].title!==undefined && tds[x].title!=="servient"){
                selectedTD= tds[x];
                break;
            }
        }
        if(selectedTD===null){
            throw new Error("Not valid TD found!");
        }
        const thing = await wot.consume(selectedTD as ThingDescription);
        const reader = await thing.readProperty(prop);
        //await delay(5000); //<-----------------------------------------DECCOMENT FOR SEE THE BUG
        console.log("Here we have the console.log");

        const ris = await reader.value();
        console.log("Here we haven't the console.log and for some reason the script exit with no err (skypping the catch too)."); 
        console.log("WotTest: ", ris);
    } catch (err) {
        console.log("WotTest: ResolveTD error 1:", err);
    }
    return ;
}

const test_01 =function(cb:() => void){
  
    test_01_async().then(cb)
    .catch((err)=>{
        console.log("WotTest: ResolveTD error 0:", err);
        cb();
    })
}

const test_02_Async = async function(){
   const td_url = "http://plugfest.thingweb.io:8083/counter";
   try {
        const servient = new Servient();
        servient.addClientFactory(new HttpClientFactory(undefined));
        const wot = await servient.start();
        const td = (await axios.get(td_url)).data;
        const thing = await wot.consume(td as ThingDescription);
        console.log("BEFORE readProperty");
        const reader = await thing.readProperty("count");
        console.log("AFTER readProperty");
        await delay(5000); //<--DECCOMENT FOR SEE THE BUG
        console.log("Here we have the console.log");
        console.log("BEFORE value");
        const ris = await reader.value();
        console.log("AFTER value");
        console.log("Here we haven't the console.log and for some reason, the script exit with no error (skipping the catch too)."); 
        console.log("WotTest result: ", ris);
    } catch (err) {
        console.log("WotTest: ResolveTD error 1:", err);
    }
}

const test_02 =function(cb:() => void){
    test_02_Async().then(cb)
    .catch((err)=>{
        console.log("WotTest: ResolveTD error 0:", err);
        cb();
    })
}

export default {
    test_01: test_01,
    test_02: test_02
}