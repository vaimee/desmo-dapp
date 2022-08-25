"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const DirectoriesCollector_1 = __importDefault(require("./DirectoriesCollector"));
// import Desmosdk from "./Desmosdk";
const dataCollector_1 = require("./consensus/dataCollector");
const EncoderLightManual_1 = __importDefault(require("./encoder/EncoderLightManual"));
// import ISourceValues from "../model/ISourceValues";
// import StringSourceValues from "../model/StringSourceValues";
const NumberSourceValues_1 = __importDefault(require("../model/NumberSourceValues"));
// import BoolSourceValues from "../model/BoolSourceValues";
// import ISource from '../model/ISource';
// import Config from "../const/Config";
const MockSourceNumb_1 = __importDefault(require("../MockSourceNumb"));
const run_test = function (sources, cb) {
    (0, dataCollector_1.collect)(sources, (s) => {
        console.log("\n###########################Sources after collect");
        for (var x in s) {
            console.log(s[x].toInfoString());
        }
        cb((0, dataCollector_1.consensus)(s));
    });
};
class Worker {
    constructor(forcePathOut) {
        this.collector = new DirectoriesCollector_1.default();
        if (forcePathOut === undefined) {
            if (process.env.IEXEC_OUT !== undefined) {
                this.iexecOut = process.env.IEXEC_OUT;
            }
            else {
                this.iexecOut = "";
            }
        }
        else {
            this.iexecOut = forcePathOut;
        }
        console.info = () => { };
        console.debug = () => { };
        console.warn = () => { };
    }
    err(err) {
        console.log("ERROR: " + err);
        if (this.cb !== undefined) {
            this.cb(null);
        }
        else {
            process.exit(1);
        }
    }
    work(query, requestID) {
        if (this.iexecOut.trim().length === 0) {
            this.err("No IEXEC_OUT!");
        }
        // const valueMatrix = [
        //   [10.11, 10.20, 10.52, 10.75],
        //   [10.10, 10.44, 10.44, 10.80],
        //   [10.4, 10.10, 10.4, 10.4],
        //   [10.15, null, 10.82, 10.99],
        //   [10.14, 10.1, 10.3, 10.67],
        //   [null, 10.66, 10.33, 10.71],
        //   [3.14, 10.1, 0.3, 10.99],
        //   [10.1, 10.33, 10.99, 10.71],
        // ];
        const valueMatrix = [
            [2.11, 2.20, 2.52, 2.75],
            [2.2, 2.44, 2.44, 2.80],
            [2.4, 2.2, 2.4, 2.4],
            [2.15, null, 2.82, 2.99],
            [2.14, 2.1, 2.3, 2.67],
            [null, 2.66, 2.33, 2.71],
            [3.14, 2.1, 0.3, 2.99],
            [2.1, 2.33, 2.99, 2.71],
        ];
        const sources = new Array();
        for (let x = 0; x < valueMatrix.length; x++) {
            sources.push(new NumberSourceValues_1.default(new MockSourceNumb_1.default("Source_" + x, x, valueMatrix[x])));
        }
        run_test(sources, (result) => {
            console.log("############## Consensus result ##############");
            console.log(result.toString());
            console.log("##############################################");
            //###########################Ecode result
            var callback_data = result.getEncodedValue(new EncoderLightManual_1.default(requestID));
            //###########################Write result
            const computedJsonObj = {
                'callback-data': callback_data
            };
            //console.log("computedJsonObj", computedJsonObj);
            if (this.cb !== undefined) {
                this.cb(computedJsonObj);
            }
            else {
                fs_1.promises.writeFile(`${this.iexecOut}/computed.json`, JSON.stringify(computedJsonObj));
            }
        });
    }
    setCB(cb) {
        this.cb = cb;
    }
}
exports.default = Worker;
