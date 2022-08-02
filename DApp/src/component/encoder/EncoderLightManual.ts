import IEncoder from "./IEncoder";
import Types from "../../const/Types";

const REQUEST_ID_SIZE = "20";
const REQUEST_ID_LENGTH = 64;
//new Uint32Array(8)

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


export default class EncoderLightManual implements IEncoder{
    

    sources: Array<{ sourceIndex: number, reward: number }>;
    encodedScores:string;
    requestID:string;

    constructor(requestID:string) {
        this.sources= new Array<{ sourceIndex: number, reward: number }>();
        this.encodedScores="";
        this.requestID=REQUEST_ID_SIZE+requestID;
    }

    computePadding(ecoded:string):string{
        const needpadding= (ecoded.length%2); 
        if(needpadding===1){
            return "1"+ecoded;
        }else{
            return "00"+ecoded;
        }
    }

    setSources(sources: Map<number,number>): void {
        /*
            Max 16 TDDs,
            sources score are represented without encoding or compression
            1 hex char for TDDs count, [0-F], 
            followed by the score list [0-3]
        */
        for(let key of sources.keys()){
            var score = sources.get(key);
            if(score===null || score===undefined){
                score=0;
            }
            this.sources.push({sourceIndex:key,reward:score});
        }
        if (this.sources.length > 16) {
            this.sources = this.sources.splice(0, 16);
        }
        this.encodedScores="0"+this.sources.length.toString(16);
        this.sources.sort((a, b) => {
            return a.sourceIndex - b.sourceIndex;
        }).map((a) => {
            this.encodedScores+="0"+a.reward;
        });
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
        //console.log("this.computePadding(typeHex+numberHex)",this.computePadding(typeHex+numberHex));
        return this.requestID+this.encodedScores +this.computePadding(typeHex+numberHex);
    }

    encodeString(stringValue: string): string {
        var type = Types.STRING;
        var typeHex = type.toString(16);
        // console.log("dataEncoded: ", hexEncode(stringValue)); //ok
        console.log("typeHex+hexEncode(stringValue)",typeHex+hexEncode(stringValue));
        console.log("this.computePadding(typeHex+hexEncode(stringValue)",this.computePadding(typeHex+hexEncode(stringValue)));
        return this.requestID+this.encodedScores+this.computePadding(typeHex+hexEncode(stringValue));
    }

    decode(callbackData: string): any {

        const _requestIDSize =REQUEST_ID_SIZE.length;
        const _requestID = REQUEST_ID_LENGTH;
        const requestID = callbackData.substring(_requestIDSize,_requestID+_requestIDSize);

        var padding =_requestIDSize+_requestID;

        //TDDs scores count
        const size =parseInt(callbackData[padding]+callbackData[padding+1],16);//value->[0,15]
        //TDDs scores list
        const directoryList=new Array<number>();
        for(let x=0;x<(size*2);x+=2){
            directoryList.push(parseInt(callbackData[padding+x+2]+callbackData[padding+x+3]));//value->[0,3]
        }
        console.log("directoryList decoded: ", directoryList); //ok

        // console.log("padding+2+size*2: "+padding+2+size*2);
        // console.log("callbackData[padding+2+size*2]: "+callbackData[padding+2+size*2]);
        padding =padding+2+size*2;
        if(callbackData[padding]==="1"){
            padding +=1;
        }else{
            padding +=2;
        }
        //console.log("padding",padding);

        const type = parseInt(callbackData[padding],16);
        // console.log("type: ", type); //ok

        const dataEncoded=callbackData.substring(padding+1);
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
        
        return {value,dirs:directoryList,requestID:requestID}
    }


}