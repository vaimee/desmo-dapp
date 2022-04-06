import IEncoder from "./iEncoder";
import Conf from "../../const/Config";
import Types from "../../const/Types";
import CommonEncoder from "./common";

const hexEncode = function(str:string){
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

const hexDecode = function(str:string){
    var j;
    var hexes = str.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}


export default class EncoderManual implements IEncoder{
    

    sources: Array<{ sourceIndex: number, reward: number }>;
    encoded:string;

    constructor(sources: Array<{ sourceIndex: number, reward: number }>) {
        this.sources = sources;
        if (this.sources.length > Conf.MAX_DIRECTORY_LIST_SIZE) {
            this.sources = this.sources.splice(0, Conf.MAX_DIRECTORY_LIST_SIZE);
        }
        /*
            1byte to represent the number of sources
            2bit to represent the punishment/reward of a source (for each source)
            in total: ((S)/4+1)Byte where S is the number of source
        */
        const arr = new Array<number>();
        this.sources.sort((a, b) => {
            return a.sourceIndex - b.sourceIndex;
        }).map((a) => {
            arr.push(a.reward); 
        });
        this.encoded=CommonEncoder.generalEncodeSources(arr);
    }

    encodeNumber(numberValue: number, precision: number): string {
        // console.log("numberValue",numberValue);
        // console.log("precision",precision);
        var type = Types.POS_FLOAT;
        var numberHex="";
        if(precision===0){
            var sanitizzeNumberValue=numberValue;
            if(sanitizzeNumberValue<0){
                sanitizzeNumberValue=sanitizzeNumberValue*-1;
                type=Types.NEG_INTEGER;
            }else{
                type=Types.POS_INTEGER;
            }
            numberHex=sanitizzeNumberValue.toString(16);
        }else{
            var sanitizzeNumberValue=numberValue;
            if(sanitizzeNumberValue<0){
                sanitizzeNumberValue=sanitizzeNumberValue*-1;
                type=Types.NEG_FLOAT;
            }else{
                type=Types.POS_FLOAT;
            }
            const precisionHex = precision.toString(16);
            const sizePrecisionHex = precisionHex.length.toString(16);
            if(sizePrecisionHex.length>1){
                throw new Error("The precision is to big for: "+precision+"!");
            }
            // console.log("sanitizzeNumberValue.toString(16)",sanitizzeNumberValue.toString(16));
            numberHex=sizePrecisionHex+precisionHex+sanitizzeNumberValue.toString(16);
        } 
        var typeHex = type.toString(16);
        return this.encoded+typeHex+numberHex;
    }

    encodeString(stringValue: string): string {
        var type = Types.STRING;
        var typeHex = type.toString(16);
        // console.log("dataEncoded: ", hexEncode(stringValue)); //ok
        return this.encoded+typeHex+hexEncode(stringValue);
    }

    decode(callbackData: string): void {

        const size =parseInt(callbackData[0]+callbackData[1],16);
        // console.log("size",size); //ok
        const directoryList= CommonEncoder.generalDecodeSources(callbackData);
        console.log("directoryList decoded: ", directoryList); //ok

        const type = parseInt(callbackData[size*2+2],16);
        // console.log("type: ", type); //ok

        const dataEncoded=callbackData.substring(size*2+3,callbackData.length);
        // console.log("dataEncoded: ", dataEncoded); //ok

        if(type===Types.NEG_FLOAT || type===Types.POS_FLOAT){
            const sizePrecision=parseInt(dataEncoded[0],16);
            // console.log("sizePrecision",sizePrecision)//ok
            const precision=parseInt(dataEncoded.substring(1,1+sizePrecision),16);
            // console.log("precision",precision) //ok
            const valueInt=parseInt(dataEncoded.substring(1+sizePrecision,dataEncoded.length),16);
            // console.log("valueInt",valueInt); //ok
            var value=(valueInt/(10**precision));
            if(type===Types.NEG_FLOAT){
                value=value*-1;
            }
            console.log("FLOAT decoded: "+ value);
        }else if(type===Types.NEG_INTEGER || type===Types.POS_INTEGER){ 
            var value=parseInt(dataEncoded,16);
            if(type===Types.NEG_INTEGER){
                value=value*-1;
            }
            console.log("INTEGER decoded: "+ value);
        }else if(type===Types.STRING){
            const value =hexDecode(dataEncoded);
            console.log("STRING decoded: "+ value);
        }else{
            throw new Error("Not implemented Type found for: "+ type);
        }
    }


}