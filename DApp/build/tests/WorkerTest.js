"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ethers_ts_1 = require("ethers-ts");
const TestConsNumb_1 = __importDefault(require("./TestConsNumb"));
const runWithPromise = function () {
    return new Promise(function (resolve, reject) {
        TestConsNumb_1.default.test_03(resolve);
    });
};
function getPrecision(a) {
    if (!isFinite(a))
        return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
class WorkerTest {
    constructor() { }
    err(err) {
        console.log("ERROR: " + err);
        process.exit(1);
    }
    work() {
        (async () => {
            try {
                const iexecOut = process.env.IEXEC_OUT;
                const real_value = await runWithPromise();
                const precision = getPrecision(real_value);
                const intvalue = Math.trunc(real_value * precision);
                var callback_data = ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["uint", "uint256", "uint"], [intvalue, precision, intvalue]);
                const computedJsonObj = {
                    'callback-data': callback_data
                };
                console.log('real_value: ' + real_value);
                console.log('intvalue: ' + intvalue);
                console.log('precision: ' + precision);
                console.log("computedJsonObj", computedJsonObj);
                await fs_1.promises.writeFile(`${iexecOut}/computed.json`, JSON.stringify(computedJsonObj));
            }
            catch (e) {
                this.err(e.message);
            }
        })();
    }
}
exports.default = WorkerTest;
