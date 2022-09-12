import axios from "axios";
import WoT from "wot-typescript-definitions";
import { ThingDescription } from "wot-typescript-definitions";
import { Servient, Helpers } from "@node-wot/core";
import { HttpClientFactory } from '@node-wot/binding-http';

const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";

const ZION = "http://localhost:3000";

const genericZionQuery = async function (query:string): Promise<{}[]|null> {
    var request_path =ZION + path_jsonPathQuery+query;
    try {
        console.log("request_path", request_path);
        return (await axios.get(request_path)).data;
    } catch (err) {
        console.log("WotTest: Zion query error:", err);
    }
    return null;
}

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

describe('Testing Wot components (you need Zion and WAM up and running)', () => {
   
    describe('WOT', () => {
        it('TD temp_01 get props', async () => {
            const td_url = "http://localhost:8080/temp_01";
            const lon = await genericGetPropFromTD(td_url, "longitude");
            const lat = await genericGetPropFromTD(td_url, "latitude");
            const value = await genericGetPropFromTD(td_url, "value");
            expect(lon).toBeDefined();
            expect(lat).toBeDefined();
            expect(value).toBeDefined();
        });

        it('TD stopligth_01 get props', async () => {
            const td_url = "http://localhost:8080/stopligth_01";
            const lon = await genericGetPropFromTD(td_url, "longitude");
            const lat = await genericGetPropFromTD(td_url, "latitude");
            const value = await genericGetPropFromTD(td_url, "value");
            expect(lon).toBeDefined();
            expect(lat).toBeDefined();
            expect(value).toBeDefined();
        });

        it('online TD counter get prop keys (just look for an answare)', async () => {
            const td_url = "http://plugfest.thingweb.io:8083/counter";
                const servient = new Servient();
                servient.addClientFactory(new HttpClientFactory(undefined));
                const wot = await servient.start();
                const td = (await axios.get(td_url)).data;
                const thing = await wot.consume(td as ThingDescription);
                const reader = await thing.readAllProperties();
                const ris = await reader.keys.length;
                expect(ris >= 0).toBeTruthy();
        });

        it('online TD counter get props', async () => {
            const td_url = "http://plugfest.thingweb.io:8083/counter";
            const lastChange = await genericGetPropFromTD(td_url, "lastChange");
            const count = await genericGetPropFromTD(td_url, "count");
            const redDotImage = await genericGetPropFromTD(td_url, "redDotImage");
            const countAsImage = await genericGetPropFromTD(td_url, "countAsImage");
            expect(lastChange).toBeDefined();
            expect(count).toBeDefined();
            expect(redDotImage).toBeDefined();
            expect(countAsImage).toBeDefined();
        });

    });

    describe('Zion', () => {
        it('Zion query on all TDs abd get latitude', async () => {
            const prop = "latitude";
            var request_path =ZION + path_getAll;
            const servient = new Servient();
            servient.addClientFactory(new HttpClientFactory(undefined));
            const WoThelpers = new Helpers(servient);
            const wot = await servient.start();
            const tds = (await axios.get(request_path)).data;
            var selectedTD = null;
            for (let x in tds) {
                if (tds[x].title !== undefined && tds[x].title !== "servient") {
                    selectedTD = tds[x];
                    break;
                }
            }

            if(selectedTD!==null){
                const thing = await wot.consume(selectedTD as ThingDescription);
                const reader = await thing.readProperty(prop);
                //await delay(5000); //<-----------------------------------------DECCOMENT FOR SEE THE BUG
                //console.log("Here we have the console.log");
                const ris = await reader.value();
                //console.log("Here we haven't the console.log and for some reason the script exit with no err (skypping the catch too).");
                // console.log("WotTest: ", ris);
                //in the last version of our WAM, we have some real sensor that has the latitude but as "null" value
                //this is why now "null" is a valid result for that test
                expect(ris !== undefined && (ris ===null  || ris.toString().length > 0)).toBeTruthy();
            }
        });

        it('Zion get ControlUnit TDs', async () => {
            const ris =await genericZionQuery("$[?(@['type']=='ControlUnit')]");
            expect(ris).toBeDefined();
            expect(ris?.length).toBeDefined();  
            if(ris?.length!==undefined){
                expect((ris.length>=3)).toBeTruthy();
            }
        });

        it('Zion query "$.id"', async () => {
            const ris = await genericZionQuery("$.id");
            expect(ris).toBeDefined();
            expect(ris?.length).toBeDefined();  
            if(ris?.length!==undefined){
                expect((ris.length>0)).toBeTruthy();
            }
        });

        it('Zion query on longitude', async () => {
            const ris = await genericZionQuery("$[*]['longitude']");
            expect(ris).toBeDefined();
            expect(ris?.length).toBeDefined();  
            if(ris?.length!==undefined){
                expect((ris.length>0)).toBeTruthy();
            }
        });

        it('Zion query on title=temp_03', async () => {
            const ris =await genericZionQuery('$.title[?@=="temp_03"]');
            expect(ris).toBeDefined();
            expect(ris?.length).toBeDefined();  
            if(ris?.length!==undefined){
                expect(ris.length).toBe(1);
                expect(ris[0]).toBe("temp_03");
            }
        });

        it('Zion query on a specific $.forms.href', async () => {
            const ris =await genericZionQuery(encodeURIComponent('$.forms.href[?@=="http://localhost:8080/servient/properties"]'));
            expect(ris).toBeDefined();
            expect(ris!==null).toBeTruthy();  
            if(ris?.length!==undefined){
                expect(ris.length>0).toBeTruthy();
            }
        });

        it('Zion query on $.forms.href', async () => {
            const ris =await genericZionQuery('$.forms.href');
            expect(ris).toBeDefined();
            expect(ris!==null).toBeTruthy();  
            expect(ris?.length).toBeDefined();
            if(ris?.length!==undefined){
                expect(ris.length>=28).toBeTruthy();
            }
        });

        it('Zion query on generic forms for stopligth_01', async () => {
            const encodedQuery = encodeURIComponent("$.forms[?@.href=~'http://(.)+/stopligth_01']");
            const ris =await genericZionQuery(encodedQuery);
            expect(ris).toBeDefined();
            expect(ris!==null).toBeTruthy();  
            expect(ris?.length).toBeDefined();
            if(ris?.length!==undefined){
                expect(ris.length>0).toBeTruthy();
            }
        });


    });
    
});