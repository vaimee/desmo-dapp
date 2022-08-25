"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EncoderLightManual_1 = __importDefault(require("../src/component/encoder/EncoderLightManual"));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});
readline.question(`Inser the callback-data and press enter:\n`, (collbackdata) => {
    console.log(`Decoding the callback-data '${collbackdata}'`);
    var _collbackdata = collbackdata;
    if (collbackdata.startsWith("0x")) {
        _collbackdata = _collbackdata.substring(2);
    }
    const requestID = _collbackdata.substring(2, 66);
    console.log("requestID: " + requestID);
    const data = _collbackdata.substring(66);
    const em = new EncoderLightManual_1.default(requestID);
    console.log("DECODED: ", em.decode(_collbackdata));
    readline.close();
});
