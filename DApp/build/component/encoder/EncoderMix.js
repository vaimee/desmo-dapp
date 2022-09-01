"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../const/Config"));
const Types_1 = __importDefault(require("../../const/Types"));
const ethers_ts_1 = require("ethers-ts");
const common_1 = __importDefault(require("./common"));
function convertTOByte(numberType, warn = false) {
    /*
            X0, X1, X2, X3, X4, X5, X6, X7
            
            X0-> 1 if warn=true

            X4,X5,X6,X7 -->Type

            X1,X2,X3    -->FUTURE USE
    */
    if (warn) {
        return 128 + numberType;
    }
    return numberType;
}
;
function convertFROMByte(uint256) {
    var ris = { type: 0, warn: true };
    if (uint256 >= 128) {
        ris.warn = true;
        ris.type = uint256 - 128;
    }
    else {
        ris.warn = false;
        ris.type = uint256;
    }
    return ris;
}
;
/*
            EXAMPLE:

        callback_data | compressedSources | compressedSources.size | typeAndWarn
        0x1FAD21...43   0403
*/
function append(callback_data, compressedSources, typeAndWarn) {
    var ris = callback_data;
    // console.log("compressedSources.length",compressedSources.length);
    for (var x = 0; x < compressedSources.length; x++) {
        var toHex = compressedSources[x].toString(16);
        if (toHex.length === 1) {
            toHex = "0" + toHex;
        }
        ris += toHex;
        console.log("compressedSources[" + x + "]", toHex);
    }
    var toHex = compressedSources.length.toString(16);
    if (toHex.length === 1) {
        toHex = "0" + toHex;
    }
    ris += toHex;
    toHex = typeAndWarn.toString(16);
    if (toHex.length === 1) {
        toHex = "0" + toHex;
    }
    ris += toHex;
    return ris;
}
class EncoderMix {
    constructor() {
        this.sources = new Array();
        this.actual = new Array();
        this.encoded = "";
        this.compressedSources = new Uint8Array();
    }
    setSources(sources) {
        for (let key of sources.keys()) {
            var score = sources.get(key);
            if (score === null || score === undefined) {
                score = 0;
            }
            this.sources.push({ sourceIndex: key, reward: score });
        }
        if (this.sources.length > Config_1.default.MAX_DIRECTORY_LIST_SIZE) {
            this.sources = this.sources.splice(0, Config_1.default.MAX_DIRECTORY_LIST_SIZE);
        }
        const arr = new Array();
        /*
            1byte to represent the number of sources
            2bit to represent the punishment/reward of a source (for each source)
            in total: ((S)/4+1)Byte where S is the number of source
        */
        this.sources.sort((a, b) => {
            return a.sourceIndex - b.sourceIndex;
        }).map((a) => {
            if (this.actual.length < 4) {
                this.actual.push(a.reward);
                // console.log("this.actual"+a.reward,this.actual);//ok
            }
            else {
                arr.push(common_1.default.buildUint8(this.actual)[0]);
                this.actual = new Array();
                this.actual.push(a.reward);
            }
        });
        arr.push(common_1.default.buildUint8(this.actual)[0]);
        this.compressedSources = new Uint8Array(arr);
        // console.log("this.ecnodedByte",this.ecnodedByte);//ok
    }
    encodeNumber(numberValue, precision = 0) {
        var callback_data;
        var warn = false;
        var type = Types_1.default.POS_FLOAT;
        if (precision === 0) {
            var sanitizzeNumberValue = numberValue;
            if (sanitizzeNumberValue < 0) {
                sanitizzeNumberValue = sanitizzeNumberValue * -1;
                type = Types_1.default.NEG_INTEGER;
            }
            else {
                type = Types_1.default.POS_INTEGER;
            }
            if (sanitizzeNumberValue > 4294967295) { //32byte uint max number
                sanitizzeNumberValue = 4294967295;
                warn = true;
            }
            callback_data = ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["uint"], [numberValue]);
        }
        else {
            var sanitizzeNumberValue = numberValue;
            var _precision = precision;
            if (sanitizzeNumberValue < 0) {
                sanitizzeNumberValue = sanitizzeNumberValue * -1;
                type = Types_1.default.NEG_FLOAT;
            }
            else {
                type = Types_1.default.POS_FLOAT;
            }
            while (sanitizzeNumberValue > 4294967295) {
                sanitizzeNumberValue = Math.trunc(sanitizzeNumberValue / 10);
                _precision -= 1;
                warn = true;
            }
            callback_data = ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["uint", "uint256"], [sanitizzeNumberValue, precision]);
        }
        console.log("callback_data", callback_data);
        this.encoded = append(callback_data, this.compressedSources, convertTOByte(type, warn));
        return this.encoded;
    }
    encodeString(stringValue) {
        const callback_data = ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["string"], [stringValue]);
        this.encoded = append(callback_data, this.compressedSources, convertTOByte(Types_1.default.STRING, false));
        return this.encoded;
    }
    decode(callbackData) {
        const size = callbackData.length;
        const hex_typeandWarn = callbackData[size - 2] + "" + callbackData[size - 1];
        const hex_sc = callbackData[size - 4] + "" + callbackData[size - 3];
        // console.log("hex_typeandWarn",hex_typeandWarn);//ok
        // console.log("hex_sc",hex_sc); //ok
        const t = convertFROMByte(parseInt(hex_typeandWarn, 16));
        const sourcesCount = parseInt(hex_sc, 16) * 2; //real sources count is: sourcesCount*4
        const hex_sources = callbackData.substring(size - (4 + sourcesCount), size - 4);
        // console.log("hex_sources",hex_sources);
        const dirs = new Array;
        for (var x = 0; x < sourcesCount * 2; x += 2) {
            const temp = hex_sources[x] + hex_sources[x + 1];
            const dir = common_1.default.unBuild8Hex(temp);
            dirs.push(dir);
            console.log("unBuild8Hex", dir);
        }
        const cleanedStr = callbackData.substring(0, callbackData.length - (4 + sourcesCount));
        // console.log("cleanedStr",cleanedStr); //ok
        var value;
        if (t.type === Types_1.default.POS_INTEGER) {
            value = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["uint"], cleanedStr);
            console.log("DECODE A POS_INTEGER: ", value);
        }
        else if (t.type === Types_1.default.NEG_INTEGER) {
            value = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["uint"], cleanedStr);
            console.log("DECODE A NEG_INTEGER: ", value);
        }
        else if (t.type === Types_1.default.POS_FLOAT) {
            value = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["uint", "uint256"], cleanedStr);
            console.log("DECODE A Types: ", value);
        }
        else if (t.type === Types_1.default.NEG_FLOAT) {
            value = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["uint", "uint256"], cleanedStr);
            console.log("DECODE A NEG_FLOAT: ", value);
        }
        else {
            value = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["string"], cleanedStr);
            console.log("DECODE A STRING: ", value);
        }
        return { value, dirs };
    }
}
exports.default = EncoderMix;
