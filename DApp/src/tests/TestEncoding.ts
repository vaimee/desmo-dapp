import EncoderMix from "../component/encoder/EncoderMix";
import EncoderManual from "../component/encoder/EncoderManual";

const convertToMap=function(arr:Array<{reward: number, sourceIndex:number}>):Map<number,number>{
    const ris = new Map<number,number>();
    for(let x =0;x<arr.length;x++){
        ris.set(arr[x].sourceIndex,arr[x].reward);
    }
    return ris;
}


const test_01 = async function() {
    console.log("\n##########   test_01  ##########");
    console.log("\n########## EncoderMix ##########");
    const temp = new EncoderMix();
    temp.setSources(convertToMap([
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 0, sourceIndex: 5 },
        { reward: 0, sourceIndex: 7 },
    ]));

    console.log("test value: "+213439.12);
    const encoded = temp.encodeNumber(21343912, 2);
    console.log("encoded", encoded);

    temp.decode(encoded);
    return;
}

const test_02 = async function() {
    console.log("\n##########    test_02    ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
    temp.setSources(convertToMap([
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 0, sourceIndex: 5 },
        { reward: 0, sourceIndex: 7 },
    ]));

    console.log("test value: "+213439.12);
    const encoded = temp.encodeNumber(21343912, 2);
    console.log("encoded", encoded);
    temp.decode(encoded);
    return;
}

const test_03 = async function() {
    console.log("\n##########    test_03    ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
    temp.setSources(convertToMap([
        { reward: 2, sourceIndex: 3 },
        { reward: 2, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 0, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 1, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ]));
    const toEncode = "prova questa è una stringa";
    console.log("test value: " + toEncode);
    const encoded = temp.encodeString(toEncode);
    console.log("encoded", encoded);
    temp.decode(encoded);
    return;
}

const test_04 = async function() {
    console.log("\n##########   test_04     ##########");
    console.log("\n########## EncoderManual ##########");
    const temp = new EncoderManual();
    temp.setSources(convertToMap([
        { reward: 2, sourceIndex: 3 },
        { reward: 1, sourceIndex: 1 },
        { reward: 1, sourceIndex: 0 },
        { reward: 1, sourceIndex: 2 },
        { reward: 1, sourceIndex: 4 },
        { reward: 0, sourceIndex: 6 },
        { reward: 2, sourceIndex: 5 },
        { reward: 2, sourceIndex: 7 },
    ]));

    console.log("test value: "+9949999123);
    const encoded = temp.encodeNumber(9949999123, 0);
    console.log("encoded", encoded);
    temp.decode(encoded);
    return;
}

export default [
     test_01,
     test_02,
     test_03,
     test_04,
]