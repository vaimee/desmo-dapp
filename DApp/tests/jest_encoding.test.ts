import EncoderMix from "../src/component/encoder/EncoderMix";
import EncoderManual from "../src/component/encoder/EncoderManual";
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";
import EncoderJson from "../src/component/encoder/EncoderJson";
import Types from "../src/const/Types";

const convertToMap=function(arr:Array<{reward: number, sourceIndex:number}>):Map<number,number>{
    const ris = new Map<number,number>();
    for(let x =0;x<arr.length;x++){
        ris.set(arr[x].sourceIndex,arr[x].reward);
    }
    return ris;
}

const compareResultForManual=function(src:any, dst:any):boolean{
    console.log("SRC",src);
    console.log("dst",dst);
    if(src.value===dst.value && src.dirs.length===dst.dirs.length){
        for(var dir of src.dirs){
            if(dst.dirs[dir.sourceIndex]!==dir.reward){
                return false;
            }
        }
        return true;
    }
    return false;
}


//-------------------------------------------

test('TestEncoding.test01', () => {
    console.log("\n##########   test_01  ##########");
    console.log("\n########## EncoderMix ##########");
    const temp = new EncoderMix();
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 0, sourceIndex: 5 },
        { reward: 0, sourceIndex: 7 },
    ];

    temp.setSources(convertToMap(dirs));
    const value = +213439.12;
    console.log("test value: "+value);
    const encoded = temp.encodeNumber(21343912, 2);
    console.log("encoded", encoded);
    const decoded = temp.decode(encoded);
    expect(decoded.value.length).toEqual(2);
    expect(decoded.dirs.length).toEqual(4);
    expect(decoded.dirs[0].length).toEqual(4);   
});

test('TestEncoding.test02', () => {
    console.log("\n##########    test_02    ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
    const dirs =[
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 0, sourceIndex: 5 },
        { reward: 0, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));

    console.log("test value: "+213439.12);
    const encoded = temp.encodeNumber(21343912, 2);
    console.log("encoded", encoded);
    expect(compareResultForManual({value:213439.12,dirs:dirs}, temp.decode(encoded))).toEqual(true);
});

test('TestEncoding.test03', () => {
    console.log("\n##########    test_03    ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
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
    temp.setSources(convertToMap(dirs));
    const toEncode = "prova questa è una stringa";
    console.log("test value: " + toEncode);
    const encoded = temp.encodeString(toEncode);
    console.log("encoded", encoded);
    expect(compareResultForManual({value:toEncode,dirs:dirs}, temp.decode(encoded))).toEqual(true);
});

test('TestEncoding.test04', () => {
    console.log("\n##########   test_04     ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));
    const value = 9949999123;
    console.log("test value: "+value);
    const encoded = temp.encodeNumber(value, 0);
    console.log("encoded", encoded);
    expect(compareResultForManual({value:value,dirs:dirs}, temp.decode(encoded))).toEqual(true);
});

test('TestEncoding.test05',  () => {
    console.log("\n##########   test_05  ##########");
    console.log("\n########## EncoderMix ##########");
    const temp = new EncoderMix();
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 0, sourceIndex: 5 },
        { reward: 0, sourceIndex: 7 },
    ];

    temp.setSources(convertToMap(dirs));
    const value = "THIS IS A TEST";
    console.log("test value: "+value);
    const encoded = temp.encodeString(value);
    console.log("encoded", encoded);
    const decoded = temp.decode(encoded);
    console.log("decoded", decoded);
    expect(decoded.value[0]).toEqual(value);
    expect(decoded.dirs[0][2]).toEqual(0);
    expect( decoded.dirs[0][3]).toEqual(2);
});

test('TestEncoding.test06',  () => {
    console.log("\n##########    test_06    ##########");
    console.log("\n########## EncoderLightManual ##########");
    const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
    const temp = new EncoderLightManual(requestID);
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
    temp.setSources(convertToMap(dirs));
    const toEncode = "prova questa è una stringa";
    console.log("test value: " + toEncode);
    const encoded = temp.encodeString(toEncode);
    console.log("encoded", encoded);
    const ris = temp.decode(encoded);
    console.log("ris", ris);
    expect(compareResultForManual({value:toEncode,dirs:dirs}, ris)).toEqual(true);
    expect(ris.requestID).toEqual(requestID);
});

test('TestEncoding.test07',  () => {
    console.log("\n##########   test_07     ##########");
    console.log("\n########## EncoderLightManual ##########");
    const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
    const temp = new EncoderLightManual(requestID);
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));
    const value = 9949999123;
    console.log("test value: "+value);
    const encoded = temp.encodeNumber(value, 0);
    console.log("encoded", encoded);
    const ris = temp.decode(encoded);
    console.log("ris", ris);
    expect(compareResultForManual({value:value,dirs:dirs}, ris)).toEqual(true);
    expect(ris.requestID).toEqual(requestID);
});

test('TestEncoding.test08',  () => {
    console.log("\n##########   test_08     ##########");
    console.log("\n########## EncoderJson ##########");
    const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
    const temp = new EncoderJson(requestID);
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));
    const value = 9949999123;
    console.log("test value: "+value);
    const encoded = temp.encodeNumber(value);
    console.log("encoded", encoded);
    const ris = temp.decode(encoded);
    console.log("ris", ris);
    expect(ris.data.value).toEqual(value);
    expect(ris.data.type).toEqual(Types.POS_INTEGER);
});

test('TestEncoding.test09',  () => {
    console.log("\n##########   test_09     ##########");
    console.log("\n########## EncoderJson ##########");
    const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
    const temp = new EncoderJson(requestID);
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));
    const value = -55.6;
    console.log("test value: "+value);
    const encoded = temp.encodeNumber(value);
    console.log("encoded", encoded);
    const ris = temp.decode(encoded);
    console.log("ris", ris);
    expect(ris.data.value).toEqual(value);
    expect(ris.data.type).toEqual(Types.NEG_FLOAT);
});

test('TestEncoding.test10',  () => {
    console.log("\n##########   test_10     ##########");
    console.log("\n########## EncoderJson ##########");
    const requestID ="e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9";
    const temp = new EncoderJson(requestID);
    const dirs = [
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ];
    temp.setSources(convertToMap(dirs));
    const value = "this is a test string";
    console.log("test value: "+value);
    const encoded = temp.encodeString(value);
    console.log("encoded", encoded);
    const ris = temp.decode(encoded);
    console.log("ris", ris);
    expect(ris.data.value).toEqual(value);
    expect(ris.data.type).toEqual(Types.STRING);
});