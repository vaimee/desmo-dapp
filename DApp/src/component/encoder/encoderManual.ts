import IEncoder from "./iEncoder";
import Conf from "../../const/Config";
import Types from "../../const/Types";
import {ethers} from "ethers-ts";

export default class EncoderManual implements IEncoder{
    
    encodeNumber(numberValue: number, precision: number): string {
        throw new Error("Method not implemented.");
    }
    encodeString(stringValue: String): string {
        throw new Error("Method not implemented.");
    }
    decode(callbackData: string): void {
        throw new Error("Method not implemented.");
    }


}