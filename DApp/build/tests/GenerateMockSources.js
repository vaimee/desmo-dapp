"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import MockSourceNumb from "./MockSourceNumb";
// import NumberSourceValues from "../model/NumberSourceValues";
const Config_1 = __importDefault(require("../src/const/Config"));
function getRandom(min, max, precision = 0) {
    const p = 10 ** precision;
    return Math.trunc((Math.random() * (max - min) + min) * p) / p;
}
/*
ARGS:
    sourcesCount:number -> Number of sources that you want generate
    minV:number         -> min of the numeric value that the sources will give
    maxV:number         -> max of the numeric value that the sources will five
    precision:number    -> precision of the float value
    miss:number         -> [0:100] prob of a source to return not valid value ("null")
    outOfRange:number   -> [0:100] prof of a source to return out of rage value (maxV*100)
*/
function genMockSources(sourcesCount, minV, maxV, precision, miss, outOfRange) {
    const valueMatrix = new Array();
    for (var s = 0; s < sourcesCount; s++) {
        const values = [];
        for (var x = 0; x < Config_1.default.AUTOCORRELATION; x++) {
            if (miss > -1 && miss < 101 && getRandom(0, 100) < miss) {
                values.push(null);
            }
            else if (outOfRange > -1 && outOfRange < 101 && getRandom(0, 100) < outOfRange) {
                values.push(maxV * 100);
            }
            else {
                values.push(getRandom(minV, maxV, precision));
            }
        }
        valueMatrix.push(values);
    }
    return valueMatrix;
}
exports.default = genMockSources;
// export default function genMockSources(
//     sourcesCount:number,
//     minV:number,
//     maxV:number,
//     precision:number,
//     miss:number,
//     outOfRange:number,
// ): Array<NumberSourceValues>{
//     const sources =new Array<NumberSourceValues>();
//     for(var s =0;s<sourcesCount;s++){
//         const values=[];
//         for(var x =0;x<Config.T;x++){
//             if(miss>-1 && miss<101 && getRandom(0,100)<miss){
//                 values.push(null);
//             }else if(outOfRange>-1 && outOfRange<101 && getRandom(0,100)<outOfRange){
//                 values.push(maxV*100);
//             }else{
//                 values.push(getRandom(minV,maxV,precision));
//             }
//         }
//         sources.push(new NumberSourceValues(new MockSourceNumb("Source_"+s,values)))
//     }
//     return sources;
// } 
