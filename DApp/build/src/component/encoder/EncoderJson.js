"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = __importDefault(require("../../const/Types"));
const ethers_ts_1 = require("ethers-ts");
const REQUEST_ID_SIZE = "20";
const REQUEST_ID_LENGTH = 64;
//new Uint32Array(8)
const hexEncode = function (str) {
    var hex, i;
    var result = "";
    for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
    }
    return result;
};
class EncoderLightManual {
    constructor(requestID) {
        this.sources = new Array();
        this.encodedScores = "";
        this.requestID = REQUEST_ID_SIZE + requestID;
    }
    setSources(sources) {
        /*
            Max 16 TDDs,
            sources score are represented without encoding or compression
            1 hex char for TDDs count, [0-F],
            followed by the score list [0-3]
        */
        for (let key of sources.keys()) {
            var score = sources.get(key);
            if (score === null || score === undefined) {
                score = 0;
            }
            this.sources.push({ sourceIndex: key, reward: score });
        }
        if (this.sources.length > 16) {
            this.sources = this.sources.splice(0, 16);
        }
        this.encodedScores = "0" + this.sources.length.toString(16);
        this.sources.sort((a, b) => {
            return a.sourceIndex - b.sourceIndex;
        }).map((a) => {
            this.encodedScores += "0" + a.reward;
        });
    }
    encodeNumber(numberValue) {
        const data = { type: 0, value: numberValue };
        if (numberValue >= 0) {
            if (Number.isInteger(numberValue)) {
                data.type = Types_1.default.POS_INTEGER;
            }
            else {
                data.type = Types_1.default.POS_FLOAT;
            }
        }
        else {
            if (Number.isInteger(numberValue)) {
                data.type = Types_1.default.NEG_INTEGER;
            }
            else {
                data.type = Types_1.default.NEG_FLOAT;
            }
        }
        return this.requestID + this.encodedScores + ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["string"], [JSON.stringify(data)]);
    }
    encodeString(stringValue) {
        const data = { type: Types_1.default.STRING, value: stringValue };
        return this.requestID + this.encodedScores + ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["string"], [JSON.stringify(data)]);
    }
    decode(callbackData) {
        const _requestIDSize = REQUEST_ID_SIZE.length;
        const _requestID = REQUEST_ID_LENGTH;
        const requestID = callbackData.substring(_requestIDSize, _requestID + _requestIDSize);
        var padding = _requestIDSize + _requestID;
        //TDDs scores count
        const size = parseInt(callbackData[padding] + callbackData[padding + 1], 16); //value->[0,15]
        //TDDs scores list
        const directoryList = new Array();
        for (let x = 0; x < (size * 2); x += 2) {
            directoryList.push(parseInt(callbackData[padding + x + 2] + callbackData[padding + x + 3])); //value->[0,3]
        }
        console.log("directoryList decoded: ", directoryList); //ok
        padding = padding + 2 + size * 2;
        const dataEncoded = callbackData.substring(padding);
        // console.log("dataEncoded: ", dataEncoded); //ok
        const v = ethers_ts_1.ethers.utils.defaultAbiCoder.decode(["string"], dataEncoded)[0];
        const data = JSON.parse(v);
        return { data, dirs: directoryList, requestID: requestID };
    }
}
exports.default = EncoderLightManual;
