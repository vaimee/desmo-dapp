import VoidSource from "../src/model/VoidSource";
import TestUtils from "./TestUtils";
import Result from "../src/model/Result";
import Source from "../src/model/Source";
import Types from "../src/const/Types";
import EncoderMix from "../src/component/encoder/EncoderMix"
import DirectoriesCollector from "../src/component/DirectoriesCollector";
import QueryParser from "../src/component/QueryParser";
import StringSourceValues from "../src/model/StringSourceValues";
import MockSourceStr from "./MockSourceStr";

const simmple_query: string = JSON.stringify({
    "prefixList": [
      {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
      {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
      {"abbreviation":"xsd", "completeURI":"http://www.w3.org/2001/XMLSchema/"},
      {"abbreviation":"monas", "completeURI":"https://pod.dasibreaker.vaimee.it/monas/"},
    ],
    "property": {
      "identifier": "value",
      "unit": "qudt:DEG_C",                     //skip
      "datatype": 3
    },
    "staticFilter": "$[?(@['@type']=='ControlUnit')]",
});

test('StringSourceValues.test01', async () => {
    
    const s1 = new MockSourceStr("Source_0", 0,[null,"A","B","C",]);
    const ssv= new StringSourceValues(s1);
    const str = "NO NEED PARSING";
    expect(ssv.parse(str)).toEqual(str);

 });

 
test('DirectoriesCollector.test01', async () => {
    const dc= new DirectoriesCollector();
    await dc.init(); 
    const parser = new QueryParser(simmple_query);
    const sources = await dc.collectDirs(["http://localhost:3000"], parser);
    console.log("DirectoriesCollector.test01",sources);
    const keys = sources.keys();
    var ok = true;
    for (let key of keys) {
        const arrS = sources.get(key);
        if(arrS!==undefined){
            for (let x=0;x<arrS.length;x++) {
                arrS[x].punish(); 
                console.log("DirectoriesCollector.test01.arrS[x].isPunished()",arrS[x].isPunished());
                if(!arrS[x].isPunished()){
                    ok=false;
                }
            }
        }
    }
    expect(ok).toEqual(true);
 });

   
test('DirectoriesCollector.test02', async () => {
    const dc= new DirectoriesCollector();
    await dc.init(); 
    const parser = new QueryParser(simmple_query);
    const sources = await dc.resolveToISourceArr([],parser,0);
    expect(sources.length).toEqual(1);
    expect(sources[0] instanceof VoidSource).toEqual(true);
 });

  

 test('DirectoriesCollector.test03', async () => {

    const dc= new DirectoriesCollector();
    await dc.init(); 
    const parser = new QueryParser(simmple_query);
    const sources = await dc.collectDirs(["http://localhost:3000"], parser);
    console.log("DirectoriesCollector.test01",sources);
    const keys = sources.keys();
    var ok = true;
    for (let key of keys) {
        const arrS = sources.get(key);
        if(arrS!==undefined){
            for (let x=0;x<arrS.length;x++) {
                arrS[x].punish(); 
                console.log("DirectoriesCollector.test01.arrS[x].isPunished()",arrS[x].isPunished());
                if(!arrS[x].isPunished()){
                    ok=false;
                }
            }
        }
    }
    expect(ok).toEqual(true);
 });

test('DirectoriesCollector.test04', async () => {
    const dc= new DirectoriesCollector();
    var ok = true;
    try{
        ok=(await dc.resolveTD({})===null);
    }catch(err){
        ok=false;
    }
    expect(ok).toEqual(true);
 });

 test('DirectoriesCollector.test05', async () => {
    const dc= new DirectoriesCollector();
    await dc.init();
    var ok = true;
    try{
        ok=(await dc.resolveTD(null)===null);
    }catch(err){
        ok=false;
    }
    expect(ok).toEqual(true);
 });


 test('DirectoriesCollector.test06', async () => {
    const dc= new DirectoriesCollector();
    const parser = new QueryParser(simmple_query);
    await dc.init();
    const sources = await dc.getThingFromDir("null",0,parser)
    expect(sources.length).toEqual(1);
    expect(sources[0] instanceof VoidSource).toEqual(true);
 });



 
test('VoidSource.test01', async () => {
   const vs= new VoidSource("http://localhost:3000",1);
    expect(vs.getIndex()).toEqual(1);
    expect(vs.getScore()).toEqual(0);
    vs.setScore(3);
    expect(vs.getScore()).toEqual(0);
    expect(vs.isPunished()).toEqual(true);
    vs.punish();
    expect(vs.getScore()).toEqual(0);
    expect(vs.isPunished()).toEqual(true);
    var err= false;
    try{
        await vs.ask();
    }catch(e){
        err=true;
    }
    expect(err).toEqual(true);
});

test('TestUtils.test01', async () => {
    expect(await TestUtils.assertTest("test",()=>{ throw Error("test error")})).toEqual(false);
    expect(await TestUtils.assertTest("test",async ()=>{return undefined})).toEqual(true);
    expect(await TestUtils.assertTest("test",async ()=>{return null},(r)=>{return r!==null;})).toEqual(false);
    expect(await TestUtils.assertTest("test",async ()=>{return null},(r)=>{return r===null;})).toEqual(true);
});

test('Result.test01', async () => {
   const ris = new Result("22222.65",Types.TYPE_NUMBER,[]);
   const encoded = ris.getEncodedValue(new EncoderMix());
   console.log("encoded:",encoded);
   expect(encoded.length>0).toEqual(true);
});


test('Result.test02', async () => {
    const ris = new Result("true",Types.TYPE_BOOLEAN,[]);
    const encoder = new EncoderMix();
    const encoded = ris.getEncodedValue(encoder);
    console.log("encoded:",encoded);
    expect(encoder.decode(encoded).value[0]).toEqual("true");
 });

 test('Result.test03', async () => {
    const ris1 = new Result("true",Types.TYPE_BOOLEAN,[]);
    expect(ris1.getType()).toEqual(Types.TYPE_BOOLEAN);
    
    const ris2 = new Result("true",Types.TYPE_STRING,[]);
    expect(ris2.getType()).toEqual(Types.TYPE_STRING);
    
    const ris3 = new Result("true",Types.TYPE_NUMBER,[]);
    expect(ris3.getType()).toEqual(Types.TYPE_NUMBER);
 });

 test('Source.test01', async () => {
    const source = new Source("http://localhost:3000",1);
    const value = source.ask();
    expect(value!==undefined && value!==null).toEqual(true);
 });

