import IEncoder from "./IEncoder";
import Conf from "../../const/Config";
import Types from "../../const/Types";
import {ethers} from "ethers-ts";
import CommonEncoder from "./common";

type TypeAndWarn = {type:number,warn:boolean}

function convertTOByte (numberType:number,warn=false):number{
    /*
            X0, X1, X2, X3, X4, X5, X6, X7
            
            X0-> 1 if warn=true

            X4,X5,X6,X7 -->Type

            X1,X2,X3    -->FUTURE USE
    */
    if(warn){
        return 128+numberType;
    }
    return numberType;
};

function convertFROMByte(uint256:number):TypeAndWarn{
   var ris ={type:0,warn:true};
   if(uint256>=128){
        ris.warn=true;
        ris.type=uint256-128;
   }else{
        ris.warn=false;
        ris.type=uint256;
   }
   return ris;
};

/*
            EXAMPLE:

        callback_data | compressedSources | compressedSources.size | typeAndWarn 
        0x1FAD21...43   0403
*/


function append(callback_data:string,compressedSources:Uint8Array,typeAndWarn:number):string{
    var ris =  callback_data;
    // console.log("compressedSources.length",compressedSources.length);
    for(var x =0;x<compressedSources.length;x++){
        var toHex=compressedSources[x].toString(16);
        if(toHex.length===1){
            toHex="0"+toHex;
        }
        ris+=toHex;
        console.log("compressedSources["+x+"]",toHex);
    }  
    var toHex=compressedSources.length.toString(16);
    if(toHex.length===1){
        toHex="0"+toHex;
    }
    ris+=toHex;
    toHex=typeAndWarn.toString(16);
    if(toHex.length===1){
        toHex="0"+toHex;
    }
    ris+=toHex;
    return ris;
}


export default class EncoderMix implements IEncoder{



    sources: Array<{ sourceIndex: number, reward: number }>;
    encoded: string;
    compressedSources: Uint8Array;
    // flagSizeByte: number;
    actual:Array<number>;

    constructor() {}

    setSources(sources: { reward: number; sourceIndex: number; }[]): void {
        this.sources = sources;
        if (this.sources.length > Conf.MAX_DIRECTORY_LIST_SIZE) {
            this.sources = this.sources.splice(0, Conf.MAX_DIRECTORY_LIST_SIZE);
        }
        // if (this.sources.length % 4 !== 3) {
        //    throw new Error("The size of the Directory list must be a number multiples of 4 less one. (example: 15,31,63,...,255)");
        // }
        this.encoded = "";
        const arr= new Array<number>();
        /*
            1byte to represent the number of sources
            2bit to represent the punishment/reward of a source (for each source)
            in total: ((S)/4+1)Byte where S is the number of source
        */
        // this.flagSizeByte=this.sources.length;
        this.actual = new Array<number>();
        this.sources.sort((a, b) => {
            return a.sourceIndex - b.sourceIndex;
        }).map((a) => {
            if (this.actual.length < 4) {
                this.actual.push(a.reward);
                // console.log("this.actual"+a.reward,this.actual);//ok
            }else{
                // this.ecnodedByte.set(buildUint8(this.actual),0);
                arr.push(CommonEncoder.buildUint8(this.actual)[0]);
                this.actual= new Array<number>();
                this.actual.push(a.reward); 
            }
        });
        arr.push(CommonEncoder.buildUint8(this.actual)[0]);
        this.compressedSources = new Uint8Array(arr);
        // console.log("this.ecnodedByte",this.ecnodedByte);//ok
    }

    encodeNumber(numberValue: number, precision=0): string {
        // if(this.actual.length!==3){
        //     throw new Error("The size of the Directory list must be a number multiples of 4 less one. (example: 15,31,63,...,255)");
        // }
        var callback_data:string;
        var warn=false;
        var type = Types.POS_FLOAT;
        if(precision===0){
            var sanitizzeNumberValue=numberValue;
            if(sanitizzeNumberValue<0){
                sanitizzeNumberValue=sanitizzeNumberValue*-1;
                type=Types.NEG_INTEGER;
            }else{
                type=Types.POS_INTEGER;
            }
            if(sanitizzeNumberValue>4294967295){//32byte uint max number
                sanitizzeNumberValue=4294967295;
                warn=true;
            }
            callback_data = ethers.utils.defaultAbiCoder.encode(["uint"], [numberValue]);
               
        }else{
            var sanitizzeNumberValue=numberValue;
            var _precision=precision;
            if(sanitizzeNumberValue<0){
                sanitizzeNumberValue=sanitizzeNumberValue*-1;
                type=Types.NEG_FLOAT;
            }else{
                type=Types.POS_FLOAT;
            }
            while(sanitizzeNumberValue>4294967295){
                sanitizzeNumberValue=Math.trunc(sanitizzeNumberValue/10);
                _precision-=1;
                warn=true;
            }
            callback_data = ethers.utils.defaultAbiCoder.encode(["uint","uint256"], [sanitizzeNumberValue,precision]);
               
        }       
        console.log("callback_data",callback_data);
        this.encoded=append(
            callback_data,
            this.compressedSources,
            // this.flagSizeByte,
            convertTOByte(type,warn)
        );
        return  this.encoded;
  
    }

    encodeString(stringValue: String): string {
        // if(this.actual.length!==3){
        //     throw new Error("The size of the Directory list must be a number multiples of 4 less one. (example: 15,31,63,...,255)");
        // }
        // this.actual.push(Types.STRING);
        const callback_data= ethers.utils.defaultAbiCoder.encode(["string"], [stringValue])
        this.encoded=append(
            callback_data,
            this.compressedSources,
            // this.flagSizeByte,
            convertTOByte(Types.STRING,false)
        );
        return  this.encoded;
    }

    decode(callbackData:string):void {
        const size = callbackData.length;        
        const hex_typeandWarn= callbackData[size-2]+""+callbackData[size-1];
        const hex_sc= callbackData[size-4]+""+callbackData[size-3];
        // console.log("hex_typeandWarn",hex_typeandWarn);//ok
        // console.log("hex_sc",hex_sc); //ok
        const t=convertFROMByte(parseInt(hex_typeandWarn, 16));
        const sourcesCount=parseInt(hex_sc, 16)*2; //real sources count is: sourcesCount*4
        const hex_sources= callbackData.substring(size-(4+sourcesCount),size-4);
        // console.log("hex_sources",hex_sources);
        for(var x =0;x<sourcesCount*2;x+=2){
            const temp = hex_sources[x]+hex_sources[x+1];
            console.log("unBuild8Hex",CommonEncoder.unBuild8Hex(temp));
        }
        const cleanedStr = callbackData.substring(0,callbackData.length-(4+sourcesCount));
        // console.log("cleanedStr",cleanedStr); //ok
        if(t.type===Types.POS_INTEGER){
            console.log("DECODE A POS_INTEGER: ",ethers.utils.defaultAbiCoder.decode(["uint"],cleanedStr));
        }else if(t.type===Types.NEG_INTEGER){
            console.log("DECODE A NEG_INTEGER: ",ethers.utils.defaultAbiCoder.decode(["uint"],cleanedStr));
        }else if(t.type===Types.POS_FLOAT){
            console.log("DECODE A Types: ", ethers.utils.defaultAbiCoder.decode(["uint","uint256"],cleanedStr));
        }else if(t.type===Types.NEG_FLOAT){
           console.log("DECODE A NEG_FLOAT: ",ethers.utils.defaultAbiCoder.decode(["uint","uint256"],cleanedStr));
        }else{
           console.log("DECODE A STRING: ",ethers.utils.defaultAbiCoder.decode(["string"],cleanedStr));
        }
    }
}