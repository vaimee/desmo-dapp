import EncoderLightManual from "../src/component/encoder/EncoderLightManual";
import EncoderJson from "../src/component/encoder/EncoderJson";
import Const from "../src/const/Const";

const convertToMap=function(arr:Array<{reward: number, sourceIndex:number}>):Map<number,number>{
    const ris = new Map<number,number>();
    for(let x =0;x<arr.length;x++){
        ris.set(arr[x].sourceIndex,arr[x].reward);
    }
    return ris;
}

describe('Encoding-Decoding tests', () => {
    describe('EncoderLightManual', () => {
        it('should encode and decode correctly a string value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const toEncode = "prova questa è una stringa";
            const src = {type:Const.STRING,value:toEncode,dirs:dirs};

            
            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeString(toEncode);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (+int) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = 9949999123;
            const src = {type:Const.POS_INTEGER,value:value,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (-int) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = -56123;
            const src = {type:Const.NEG_INTEGER,value:value,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });
      
        it('should encode and decode correctly a number (+float) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = 99499991.23;
            const src = {type:Const.POS_FLOAT,value:value,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (-float) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 1, sourceIndex: 1 },
                { reward: 2, sourceIndex: 0 },
                { reward: 2, sourceIndex: 2 },
                { reward: 2, sourceIndex: 4 },
                { reward: 1, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = -0.666;
            const src = {type:Const.NEG_FLOAT,value:value,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a no-consensus', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 0, sourceIndex: 3 },
                { reward: 0, sourceIndex: 1 },
                { reward: 0, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 0, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 0, sourceIndex: 7 },
            ];
            const src = {type:Const.NO_CONSENSUS,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNoConsensus();
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(dst.value).toBe(undefined);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a booleans', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 0, sourceIndex: 3 },
                { reward: 0, sourceIndex: 1 },
                { reward: 0, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 0, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 0, sourceIndex: 7 },
            ];
            const src = {value:true,type:Const.BOOLEAN,dirs:dirs};

            const encdec = new EncoderLightManual(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeBoolean(src.value.toString());
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(dst.value).toBe(src.value.toString());
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });
    });

    describe('EncoderJson', () => {
        it('should encode and decode correctly a string value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const toEncode = "prova questa è una stringa";
            const src = {type:Const.STRING,value:toEncode,dirs:dirs};

            
            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeString(toEncode);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (+int) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = 9949999123;
            const src = {type:Const.POS_INTEGER,value:value,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (-int) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = -554;
            const src = {type:Const.NEG_INTEGER,value:value,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });
      
        it('should encode and decode correctly a number (+float) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 2, sourceIndex: 1 },
                { reward: 1, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 1, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 1, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = 99499991.23;
            const src = {type:Const.POS_FLOAT,value:value,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a number (-float) value', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 2, sourceIndex: 3 },
                { reward: 1, sourceIndex: 1 },
                { reward: 2, sourceIndex: 0 },
                { reward: 2, sourceIndex: 2 },
                { reward: 2, sourceIndex: 4 },
                { reward: 1, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 2, sourceIndex: 7 },
            ];
            const value = -0.666;
            const src = {type:Const.NEG_FLOAT,value:value,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNumber(value);
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(src.value).toBe(dst.value);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        it('should encode and decode correctly a no-consensus', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 0, sourceIndex: 3 },
                { reward: 0, sourceIndex: 1 },
                { reward: 0, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 0, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 0, sourceIndex: 7 },
            ];
            const src = {type:Const.NO_CONSENSUS,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeNoConsensus();
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(dst.value).toBe(undefined);
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

        
        it('should encode and decode correctly a booleans', async () => {
            const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
            const dirs =[
                { reward: 0, sourceIndex: 3 },
                { reward: 0, sourceIndex: 1 },
                { reward: 0, sourceIndex: 0 },
                { reward: 0, sourceIndex: 2 },
                { reward: 0, sourceIndex: 4 },
                { reward: 0, sourceIndex: 6 },
                { reward: 0, sourceIndex: 5 },
                { reward: 0, sourceIndex: 7 },
            ];
            const src = {value:true,type:Const.BOOLEAN,dirs:dirs};

            const encdec = new EncoderJson(requestID);
            encdec.setSources(convertToMap(dirs));
            const encoded = encdec.encodeBoolean(src.value.toString());
            const dst = encdec.decode(encoded);
            expect(dst.requestID).toBe(requestID);
            expect(dst.value).toBe(src.value.toString());
            expect(src.dirs.length).toBe(dst.dirs.length);
            expect(src.type).toBe(dst.type);
            for(var dir of src.dirs){
                expect(dst.dirs[dir.sourceIndex]).toBe(dir.reward);
            }
        });

    });

   
});