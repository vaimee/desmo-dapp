import IEncoder from "./IEncoder";
import Conf from "../../const/Config";
import Types from "../../const/Types";
import CommonEncoder from "./common";

const hexEncode = function(str:string):string{
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

const hexDecode = function(str:string):string{
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

    constructor() {
        this.sources= new Array<{ sourceIndex: number, reward: number }>();
        this.encoded="";
    }

    computePadding(ecoded:string):string{
        const needpadding= 4-(ecoded.length%4);
        var padding = ""+needpadding;
        for(let x =0;x<needpadding-1;x++){
            padding+="0";
        }
        return padding+ecoded;
    }

    setSources(sources: Map<number,number>): void {
        for(let key of sources.keys()){
            var score = sources.get(key);
            if(score===null || score===undefined){
                score=0;
            }
            this.sources.push({sourceIndex:key,reward:score});
        }
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

    encodeNumber(numberValue: number, precision=0): string {
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
        return this.computePadding(this.encoded+typeHex+numberHex);
    }

    encodeString(stringValue: string): string {
        var type = Types.STRING;
        var typeHex = type.toString(16);
        // console.log("dataEncoded: ", hexEncode(stringValue)); //ok
        return this.computePadding(this.encoded+typeHex+hexEncode(stringValue));
    }

    decode(callbackData: string): any {

        //padding
        const padding = Number(callbackData[0]);

        const size =parseInt(callbackData[padding]+callbackData[padding+1],16);
        // console.log("size",size); //ok
        const directoryList= CommonEncoder.generalDecodeSources(callbackData.substring(padding));
        console.log("directoryList decoded: ", directoryList); //ok

        const type = parseInt(callbackData[padding+size*2+2],16);
        // console.log("type: ", type); //ok

        const dataEncoded=callbackData.substring(padding+size*2+3);
        // console.log("dataEncoded: ", dataEncoded); //ok
        var value:any;
        if(type===Types.NEG_FLOAT || type===Types.POS_FLOAT){
            const sizePrecision=parseInt(dataEncoded[0],16);
            // console.log("sizePrecision",sizePrecision)//ok
            const precision=parseInt(dataEncoded.substring(1,1+sizePrecision),16);
            // console.log("precision",precision) //ok
            const valueInt=parseInt(dataEncoded.substring(1+sizePrecision,dataEncoded.length),16);
            // console.log("valueInt",valueInt); //ok
            value=(valueInt/(10**precision));
            if(type===Types.NEG_FLOAT){
                value=value*-1;
            }
            console.log("FLOAT decoded: "+ value);
        }else if(type===Types.NEG_INTEGER || type===Types.POS_INTEGER){ 
            value=parseInt(dataEncoded,16);
            if(type===Types.NEG_INTEGER){
                value=value*-1;
            }
            console.log("INTEGER decoded: "+ value);
        }else if(type===Types.STRING){
            value =hexDecode(dataEncoded);
            console.log("STRING decoded: "+ value);
        }else{
            throw new Error("Not implemented Type found for: "+ type);
        }
        
        return {value,dirs:directoryList}
    }


}