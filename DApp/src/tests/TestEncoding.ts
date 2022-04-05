import Encoder from "../component/encoder/encoderMix";

function test_01(){
     const temp =  new Encoder([
            {reward:2,sourceIndex:3},
            {reward:1,sourceIndex:1},
            {reward:1,sourceIndex:0},
            {reward:0,sourceIndex:2},
            {reward:1,sourceIndex:4},
            {reward:0,sourceIndex:6},
            {reward:0,sourceIndex:5},
            {reward:0,sourceIndex:7},
        ]);

   const encoded= temp.encodeNumber(21343912,2);
   console.log("encoded",encoded);
   
   temp.decode(encoded);
}

export default {
    test_01: test_01,
}