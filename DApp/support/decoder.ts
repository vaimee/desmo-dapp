
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question(`Inser the callback-data and press enter:\n`, (collbackdata:string) => {
    console.log(`Decoding the callback-data '${collbackdata}'`);
    var _collbackdata =collbackdata;
    if(collbackdata.startsWith("0x")){
        _collbackdata=_collbackdata.substring(2);
    }
    const requestID = _collbackdata.substring(2,66);
    console.log("requestID: "+ requestID);
    const data = _collbackdata.substring(66);
    const em = new EncoderLightManual(requestID);
    console.log("DECODED: ",em.decode(_collbackdata));
    readline.close();
  });
  