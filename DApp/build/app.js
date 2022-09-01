"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        logger.addLog("APP", JSON.stringify(process.argv));
        const requestID = process.argv[2].trim();
        const query = process.argv[3].trim().replace(/__!_/gm, "\"").replace(/--#-/gm, "'");
        const worker = new Worker_1.default("/iexec_out");
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
