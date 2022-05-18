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
        await delay(5000); //RITARDO
        console.log("qui stampa");
        const ris = await reader.value();
        console.log("qui NON stampa"); //questo viene stampato senza ritardo
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

export default {
    test_01: test_01,
}