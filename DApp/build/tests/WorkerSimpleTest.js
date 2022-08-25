"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ethers_ts_1 = require("ethers-ts");
class WorkerSimpleTest {
    constructor() { }
    err(err) {
        console.log("ERROR: " + err);
        process.exit(1);
    }
    work() {
        (async () => {
            try {
                const iexecOut = process.env.IEXEC_OUT;
                var callback_data = ethers_ts_1.ethers.utils.defaultAbiCoder.encode(["uint"], [10]);
                const computedJsonObj = {
                    'callback-data': callback_data
                };
                console.log("callback-data: ", computedJsonObj);
                await fs_1.promises.writeFile(`${iexecOut}/computed.json`, JSON.stringify(computedJsonObj));
            }
            catch (e) {
                this.err(e.message);
            }
        })();
    }
}
exports.default = WorkerSimpleTest;
