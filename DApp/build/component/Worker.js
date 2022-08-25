"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const QueryParser_1 = __importDefault(require("./QueryParser"));
const DirectoriesCollector_1 = __importDefault(require("./DirectoriesCollector"));
const Desmosdk_1 = __importDefault(require("./Desmosdk"));
const dataCollector_1 = require("./consensus/dataCollector");
const EncoderLightManual_1 = __importDefault(require("./encoder/EncoderLightManual"));
const StringSourceValues_1 = __importDefault(require("../model/StringSourceValues"));
const NumberSourceValues_1 = __importDefault(require("../model/NumberSourceValues"));
const BoolSourceValues_1 = __importDefault(require("../model/BoolSourceValues"));
const Config_1 = __importDefault(require("../const/Config"));
const Logger_1 = __importDefault(require("./Logger"));
const componentName = "Worker";
class Worker {
    constructor(forcePathOut) {
        this.logger = Logger_1.default.getInstance();
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
        this.logger.addLog(componentName, err, true);
        this.logger.sendLogs(() => {
            if (this.cb !== undefined) {
                this.cb(null);
            }
            else {
                //process.exit(1);
            }
        });
    }
    async work(query, requestID) {
        this.logger.setRequestID(requestID);
        this.logger.addLog(componentName, "QUERY is: " + query);
        if (this.iexecOut.trim().length === 0) {
            this.err("No IEXEC_OUT!");
        }
        //HERE WE NEED RESOLVE requestID and get
        //query and directoriesList from new DSEMO-SDK
        const directoriesList = await new Desmosdk_1.default().getTDDsByRequestID(requestID);
        const parser = new QueryParser_1.default(query);
        //const parser = new QueryParser("{\"prefixList\":[{\"abbreviation\":\"desmo\",\"completeURI\":\"https://desmo.vaimee.it/\"},{\"abbreviation\":\"qudt\",\"completeURI\":\"http://qudt.org/schema/qudt/\"},{\"abbreviation\":\"xsd\",\"completeURI\":\"http://www.w3.org/2001/XMLSchema/\"},{\"abbreviation\":\"monas\",\"completeURI\":\"https://pod.dasibreaker.vaimee.it/monas/\"}],\"property\":{\"identifier\":\"value\",\"unit\":\"qudt:DEG_C\",\"datatype\":3},\"staticFilter\":\"$[?(@['type']=='ControlUnit')]\"}");
        try {
            this.logger.addLog(componentName, "Parsing query ...");
            parser.parse();
        }
        catch (e) {
            this.err(e.message);
        }
        if (!parser.isValid()) {
            this.err("Query not valid!");
        }
        else if (directoriesList.length < Config_1.default.AUTOCORRELATION) {
            this.err("Directories list length must be at least " + Config_1.default.AUTOCORRELATION + ".");
        }
        else if (directoriesList.length % 4 !== 0) {
            this.err("Directories list must be multipler of 4 and at least 4.");
        }
        else if (directoriesList.length > Config_1.default.MAX_DIRECTORY_LIST_SIZE) {
            this.err("Directories list must at most of " + Config_1.default.MAX_DIRECTORY_LIST_SIZE + ".");
        }
        else {
            this.logger.addLog(componentName, "Collect Directories and TDs ...");
            const realWork = async () => {
                await this.collector.init();
                //###########################Retrieve values
                const sources = await this.collector.collectDirs(directoriesList, parser);
                this.logger.addLog(componentName, "Collect values ...");
                if (parser.isAskingForNumber()) {
                    this.logger.addLog(componentName, "###INFO###: Using NumberSourceValues.");
                }
                else if (parser.isAskingForString()) {
                    this.logger.addLog(componentName, "###INFO###: Using StringSourceValues.");
                }
                else if (parser.isAskingForBoolean()) {
                    this.logger.addLog(componentName, "###INFO###: Using BoolSourceValues.");
                }
                else {
                    this.err("Result Type of the request unknow!");
                    // break; //no need, this.err will exit 
                }
                var sourceValues = new Array();
                const keys = sources.keys();
                for (let key of keys) {
                    const tds = sources.get(key);
                    if (tds !== undefined) {
                        for (var y = 0; y < tds.length; y++) {
                            if (parser.isAskingForNumber()) {
                                sourceValues.push(new NumberSourceValues_1.default(tds[y]));
                            }
                            else if (parser.isAskingForString()) {
                                sourceValues.push(new StringSourceValues_1.default(tds[y]));
                            }
                            else if (parser.isAskingForBoolean()) {
                                sourceValues.push(new BoolSourceValues_1.default(tds[y]));
                            }
                            else {
                                this.err("Result Type of the request unknow!");
                                // break; //no need, this.err will exit 
                            }
                        }
                    }
                    else {
                        this.err("TDs undefined for Directory index: " + key);
                        // break; //no need, this.err will exit 
                    }
                }
                this.logger.addLog(componentName, "###: " + sourceValues.length);
                const s = await (0, dataCollector_1.collect)(sourceValues);
                //###########################Compute result
                // try {
                const result = (0, dataCollector_1.consensus)(s);
                this.logger.addLog(componentName, "############## Consensus result ##############");
                this.logger.addLog(componentName, result.toString());
                this.logger.addLog(componentName, "##############################################");
                //###########################Ecode result
                var callback_data = result.getEncodedValue(new EncoderLightManual_1.default(requestID.substring(2)));
                //###########################Write result
                const computedJsonObj = {
                    'callback-data': callback_data
                };
                this.logger.addLog(componentName, "computedJsonObj: " + JSON.stringify(computedJsonObj));
                const finalLoggerCall = (msg, isErr) => {
                    this.logger.addLog(componentName, msg, isErr);
                    this.logger.addLog(componentName, "DAPP ENDS");
                    this.logger.sendLogs(() => { });
                };
                if (this.cb !== undefined) {
                    this.cb(computedJsonObj);
                }
                else {
                    fs_1.promises.writeFile(`${this.iexecOut}/computed.json`, JSON.stringify(computedJsonObj)).then((ris) => {
                        finalLoggerCall("fsPromises.writeFile finished!", false);
                    }).catch((err) => {
                        finalLoggerCall(err, true);
                    });
                }
            };
            try {
                await realWork();
            }
            catch (generalErr) {
                if (generalErr instanceof Error) {
                    this.err(generalErr.message);
                }
                else {
                    this.err("Unknow error!");
                }
            }
        }
    }
    setCB(cb) {
        this.cb = cb;
    }
}
exports.default = Worker;
