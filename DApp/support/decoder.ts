
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";

const em = new EncoderLightManual();
const toDecode="20822202013112e9";
console.log("DECODING: "+ toDecode);
console.log(em.decode(toDecode));