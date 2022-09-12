import VoidSource from "../src/model/VoidSource";
import Result from "../src/model/Result";
import Source from "../src/model/Source";
import {ValueType} from "../src/const/ValueType";
import DirectoriesCollector from "../src/component/DirectoriesCollector";
import QueryParser from "../src/component/QueryParser";
import StringSourceValues from "../src/model/StringSourceValues";
import MockSourceStr from "./mocks/MockSourceStr";
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";
import ISourceValues from "../src/model/ISourceValues";
import NumberSourceValues from "../src/model/NumberSourceValues";
import Const from "../src/const/Const";

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

describe('Testing subcomponent', () => {
    describe('StringSourceValues', () => {

        it('StringSourceValues with a MockSourceStr', async () => {
            const s1 = new MockSourceStr("Source_0", 0,[null,"A","B","C",]);
            const ssv= new StringSourceValues(s1);
            const str = "NO NEED PARSING";
            expect(ssv.parse(str)).toEqual(str);
        });
    });

    describe('DirectoriesCollector', () => {
        it('Collect and punish some sources with a query', async () => {
            const dc= new DirectoriesCollector();
            await dc.init(); 
            const parser = new QueryParser(simmple_query);
            const sources = await dc.collectDirs(["http://localhost:3000"], parser);
            expect(sources.size>0).toEqual(true);
            const keys = sources.keys();
            for (let key of keys) {
                const arrS = sources.get(key);
                if(arrS!==undefined){
                    for (let x=0;x<arrS.length;x++) {
                        arrS[x].punish(); 
                        expect(arrS[x].isPunished()).toEqual(true);
                    }
                }
            }
        });

        it('Testing VoidSource, no TDD found', async () => {
            const dc= new DirectoriesCollector();
            await dc.init(); 
            const parser = new QueryParser(simmple_query);
            const sources = await dc.resolveToISourceArr([],parser,0);
            expect(sources.length).toEqual(1);
            expect(sources[0] instanceof VoidSource).toEqual(true);
        });
        
        it('Testing resolveTD with a void TD', async () => {
            const dc= new DirectoriesCollector();
            await dc.init();
            expect(await dc.resolveTD({})).toEqual(null);
        });

        it('Testing resolveTD with a NULL TD', async () => {
            const dc= new DirectoriesCollector();
            await dc.init();
            expect(await dc.resolveTD(null)).toEqual(null);
        });

        it('Testing getThingFromDir with a not valid TDD', async () => {
            const dc= new DirectoriesCollector();
            const parser = new QueryParser(simmple_query);
            await dc.init();
            const sources = await dc.getThingFromDir("null",0,parser)
            expect(sources.length).toEqual(1);
            expect(sources[0] instanceof VoidSource).toEqual(true);
        });

        it('Testing VoidSource, should always stay punished', async () => {
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


        it('Testing VoidSource, should always stay punished', async () => {
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
    });
    
    describe('Result', () => {

        it('Testing getEncodedValue, that will use the encoder to encode the result', () => {
            const ris = new Result("22222.65",ValueType.TYPE_NUMBER,[]);
            const encoded = ris.getEncodedValue(new EncoderLightManual("e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9"));
            expect(encoded).toBe("20e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d90016");
        });

        it('Testing encoding  wrapped by Result, with decoding value check (no consensus)', () => {
            const ris = new Result("true",ValueType.TYPE_BOOLEAN,[]);
            const requestID="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const encoder =new EncoderLightManual(requestID);
            const encoded = ris.getEncodedValue(encoder);
            const decoded = encoder.decode(encoded);
            expect(decoded.value).toBe(undefined);
            expect(decoded.type).toBe(Const.NO_CONSENSUS);
            expect(decoded.requestID).toBe(requestID);
        });

        it('Testing encoding  wrapped by Result, with decoding value check', () => {
            const sources=new Array<ISourceValues>();
            for(let x=0;x<6;x++){
                sources.push(new NumberSourceValues(new Source("",1)));
            }
            const ris = new Result("12345",ValueType.TYPE_NUMBER,sources);
            const requestID="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const encoder =new EncoderLightManual(requestID);
            const encoded = ris.getEncodedValue(encoder);
            const decoded = encoder.decode(encoded);
            expect(decoded.value).toBe(12345);
            expect(decoded.type).toBe(Const.POS_INTEGER);
            expect(decoded.requestID).toBe(requestID);
        });

        it('Testing Result types', () => {

            const sources=new Array<ISourceValues>();
            for(let x=0;x<6;x++){
                sources.push(new NumberSourceValues(new Source("",1)));
            }
            const ris1 = new Result("true",ValueType.TYPE_BOOLEAN,sources);
            const ris3 = new Result("123",ValueType.TYPE_NUMBER,sources);
            const ris2 = new Result("scdrgfhrtg",ValueType.TYPE_STRING,sources);
            const ris4 = new Result("scdrgfhrtg",ValueType.TYPE_STRING,[]);

            expect(ris1.getType()).toBe(ValueType.TYPE_BOOLEAN);
            expect(ris2.getType()).toBe(ValueType.TYPE_STRING);
            expect(ris3.getType()).toBe(ValueType.TYPE_NUMBER);
            expect(ris4.getType()).toBe(ValueType.TYPE_NO_CONSENSUS);
        });

  
        
    });

    
    describe('Source', () => {
        it('Testing Source (this is a mock source)',async () => {
            const source = new Source("http://localhost:3000",1);
            const value =await source.ask();
            expect(value!==undefined && value!==null).toBe(true);
        });

    });
});