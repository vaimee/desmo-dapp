import EncoderMix from "../src/component/encoder/EncoderMix";
import EncoderManual from "../src/component/encoder/EncoderManual";
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";

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

const test_01 = async function():Promise<boolean> {
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
    return decoded.value.length===2 && decoded.dirs.length===4 && decoded.dirs[0].length===4;
}

const test_02 = async function():Promise<boolean> {
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

    return compareResultForManual({value:213439.12,dirs:dirs}, temp.decode(encoded));
}

const test_03 = async function():Promise<boolean> {
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

    return compareResultForManual({value:toEncode,dirs:dirs}, temp.decode(encoded));
}

const test_04 = async function():Promise<boolean> {
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
    return compareResultForManual({value:value,dirs:dirs}, temp.decode(encoded));
}

const test_05 = async function():Promise<boolean> {
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
    //console.log("decoded", decoded);
    return decoded.value[0] === value && decoded.dirs[0][2]===0 && decoded.dirs[0][3]===2;
}


const test_06 = async function():Promise<boolean> {
    console.log("\n##########    test_06    ##########");
    console.log("\n########## EncoderLightManual ##########");
    const temp = new EncoderLightManual();
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

    return compareResultForManual({value:toEncode,dirs:dirs}, temp.decode(encoded));
}

const test_07 = async function():Promise<boolean> {
    console.log("\n##########   test_07     ##########");
    console.log("\n########## EncoderLightManual ##########");
    const temp = new EncoderLightManual();
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
    return compareResultForManual({value:value,dirs:dirs}, temp.decode(encoded));
}

export default {
     test_01,
     test_02,
     test_03,
     test_04,
     test_05,
     test_06,
     test_07,
}