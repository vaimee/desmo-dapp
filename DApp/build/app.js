"use strict";
//////#######################TEST 1
// import WorkerTest from "./component/WorkerTest";
// const worker = new WorkerTest();
// worker.work();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//////#######################TEST 2
//import WorkerSimpleTest from "./component/WorkerSimpleTest";
// const worker = new WorkerSimpleTest();
// worker.work();
//################## CHAIN TEST 
// import { promises as fsPromises } from 'fs';
// import {ethers} from "ethers-ts";
// var ris = JSON.stringify(Object.keys(process.env)) + "\n" + JSON.stringify(Object.keys(process.argv));
// const computedJsonObj = {
//     'callback-data': ethers.utils.defaultAbiCoder.encode(["string"], [ris])
// };
// fsPromises.writeFile(
// `${process.env.IEXEC_OUT}/computed.json`,
// JSON.stringify(computedJsonObj),
// );
const Logger_1 = __importDefault(require("./component/Logger"));
const Worker_1 = __importDefault(require("./component/Worker"));
const logger = Logger_1.default.setInstance();
logger.addLog("APP", "DApp started!");
process.on('unhandledRejection', error => {
    if (error !== undefined && error !== null) {
        if (error instanceof Error) {
            logger.addLog("unhandledRejection", error.message, true);
        }
        else {
            logger.addLog("APP", JSON.stringify(error), true);
        }
    }
});
//getting args 
//params: requestID + ' | ' + query,
const _run = async () => {
    try {
        // const args =process.argv[2];
        // logger.addLog("APP",args);
        logger.addLog("APP", JSON.stringify(process.argv));
        // const spittedArgs = args.split("|");
        const requestID = process.argv[2].trim();
        const query = process.argv[3].trim().replace(/__!_/gm, "\"").replace(/--#-/gm, "'");
        const worker = new Worker_1.default(undefined);
        await worker.work(query, requestID);
    }
    catch (err) {
        logger.addLog("APP", JSON.stringify(err), true);
        if (err instanceof Error) {
            logger.addLog("APP", err.toString(), true);
            logger.addLog("APP", err.message, true);
            if (err.stack !== undefined) {
                logger.addLog("APP", err.stack, true);
            }
        }
    }
};
_run();