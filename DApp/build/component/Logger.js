"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Config_1 = __importDefault(require("../const/Config"));
class Logger {
    constructor() {
        this.log = new Array();
        this.requestID = "NOT SETTED REQEUSTID";
        this.id = new Date().toString();
        this.log.push("##################################################");
        this.log.push("DApp init log at: " + this.id);
        this.log.push("##################################################");
    }
    static getInstance() {
        if (Logger.instance === undefined) {
            return Logger.setInstance();
        }
        return Logger.instance;
    }
    static setInstance() {
        Logger.instance = new Logger();
        return Logger.instance;
    }
    setRequestID(requestID) {
        this.requestID = requestID;
    }
    addLog(componentName, msg, err = false) {
        var _log = "";
        if (err) {
            _log = "[" + new Date().toString() + "][" + componentName + "] !ERROR!: " + msg;
        }
        else {
            _log = "[" + new Date().toString() + "][" + componentName + "]: " + msg;
        }
        this.log.push(_log);
        console.log(_log);
        this.sendLog(_log);
    }
    sendLog(actualLog) {
        var headers = { 'Content-Type': 'application/json' };
        axios_1.default.post(Config_1.default.LOGGER_URL, {
            id: this.id,
            requestID: this.requestID,
            log: actualLog,
            partial: true
        }, { headers: headers });
    }
    sendLogs(cb) {
        const callAfter = () => {
            if (cb !== undefined) {
                cb();
            }
        };
        var headers = { 'Content-Type': 'application/json' };
        axios_1.default.post(Config_1.default.LOGGER_URL, {
            id: this.id,
            requestID: this.requestID,
            logs: this.log,
            partial: false
        }, { headers: headers })
            .then(callAfter)
            .catch(callAfter);
    }
}
exports.default = Logger;
