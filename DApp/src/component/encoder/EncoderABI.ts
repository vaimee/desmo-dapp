import IEncoder from "./IEncoder";
// import Conf from "../../const/Config";
// import Types from "../../const/Types";
// import {ethers} from "ethers-ts";

//################WIP
//################WIP
//################WIP

export default class EncoderABI implements IEncoder{

    setSources(sources: Map<number,number>): void {
        throw new Error("Method not implemented.");
    }
    
    encodeNumber(numberValue: number, precision=0): string{
        throw new Error("Method not implemented.");
    }
    encodeString(stringValue: String): string {
        throw new Error("Method not implemented.");
    }
    decode(callbackData: string): void {
        throw new Error("Method not implemented.");
    }


}