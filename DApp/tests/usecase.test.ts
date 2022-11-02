import Worker from "../src/component/Worker";
import Const from "../src/const/Const";
import Config from "../src/const/Config";

const query: string = JSON.stringify({
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"xsd", "completeURI":"http://www.w3.org/2001/XMLSchema/"},
    {"abbreviation":"monas", "completeURI":"https://pod.dasibreaker.vaimee.it/monas/"},
  ],
  "property": {
    "identifier": "temperature",
    "unit": "qudt:DEG_C",                     //skip
    "datatype": 1
  },
  "staticFilter": "$[?(@['type']=='Sensor')]",
});

const query2: string = JSON.stringify({
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"xsd", "completeURI":"http://www.w3.org/2001/XMLSchema/"},
    {"abbreviation":"monas", "completeURI":"https://pod.dasibreaker.vaimee.it/monas/"},
  ],
  "property": {
    "identifier": "color",
    "unit": "qudt:DEG_C",                     //skip
    "datatype": 4
  },
  "staticFilter": "$[?(@['type']=='ControlUnit')]"
});

describe('Testing Worker (you need Zion and WAM up and running)', () => {
    describe('Worker complete usecase tests', () => {

        it('Using Zion and Sensor TDs', async () => {
  
            const worker = new Worker("./mount/iexec_out/");
            const ris = await worker.work(query, Const.INTERNAL_TEST_REQUEST_ID_ZION);  

            expect(ris).toBeDefined();
            expect(ris!==null).toBeTruthy();
            expect(ris["callback-data"].length).toBeGreaterThan(0);
        });

        it('Using Zion and bme TDs', async () => {
  
            const worker = new Worker("./mount/iexec_out/");
         
            const ris = await worker.work(query2, Const.INTERNAL_TEST_REQUEST_ID_ZION); 

            expect(ris).toBeDefined();
        });

       
    });

    describe('Worker errors', () => {
        it('Desmosdk will retrieve not multiple of 4 TDDs', async () => {
            const worker = new Worker("./mount/iexec_out/");
         
            const workPromise = worker.work(query, Const.INTERNAL_TEST_REQUEST_ID_REJECT_1);  
            await expect(workPromise).rejects.toBeDefined();
        });

        it('Desmosdk will retrieve not enought TDDs', async () => {
            const worker = new Worker("./mount/iexec_out/");

            const workPromise = worker.work(query, Const.INTERNAL_TEST_REQUEST_ID_REJECT_2);
            await expect(workPromise).rejects.toBeDefined();
        });

        it('Desmosdk will retrieve to many TDDs', async () => {
            const worker = new Worker("./mount/iexec_out/");

            const workPromise = worker.work(query, Const.INTERNAL_TEST_REQUEST_ID_REJECT_3); 
            await expect(workPromise).rejects.toBeDefined();
        });

        it('Worker with not valid args', async () => {
            const worker = new Worker(Config.DEFAULT_IEXEC_OUT);

            const workPromise = worker.work(JSON.stringify({ not: "validquery" }), ""); 
            await expect(workPromise).rejects.toBeDefined();
        });

    });
    
});