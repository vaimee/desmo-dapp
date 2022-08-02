
import EncoderLightManual from "../src/component/encoder/EncoderLightManual";

const em = new EncoderLightManual("e9707d0e6171f728f7473c24cc0432a9b07eaaf1efed6a137a4a8c12c79552d9");
const toDecode="20822202013112e9";
console.log("DECODING: "+ toDecode);
console.log(em.decode(toDecode));