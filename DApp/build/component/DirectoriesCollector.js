"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WotSource_1 = __importDefault(require("../model/WotSource"));
const VoidSource_1 = __importDefault(require("../model/VoidSource"));
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@node-wot/core");
const binding_http_1 = require("@node-wot/binding-http");
const Config_1 = __importDefault(require("../const/Config"));
const Logger_1 = __importDefault(require("./Logger"));
const componentName = "DirectoriCollector";
const path_jsonPathQuery = "/search/jsonpath?query=";
const path_getAll = "/things";
class DirectoriesCollector {
    constructor() {
        this.servient = new core_1.Servient();
        this.servient.addClientFactory(new binding_http_1.HttpClientFactory(undefined));
        this.servient.addClientFactory(new binding_http_1.HttpsClientFactory(undefined));
        this.WoThelpers = new core_1.Helpers(this.servient);
    }
    async init() {
        this.servient.start().then((WoT) => {
            this.wot = WoT;
        });
    }
    async resolveTD(td) {
        if (this.wot === undefined) {
            Logger_1.default.getInstance().addLog(componentName, "ResolveTD error: wot is still undefined!", true);
            return null;
        }
        else {
            try {
                //console.info("========== START");
                const thing = await this.wot.consume(td);
                //console.info("========== END");
                return thing;
            }
            catch (err) {
                Logger_1.default.getInstance().addLog(componentName, "ResolveTD error: " + err, true);
                return null;
            }
        }
    }
    async resolveToISourceArr(tds, parser, index) {
        // console.log(tds,tds);
        const ris = new Array();
        const propName = parser.getPropertyIdentifier();
        //in case of fail, the returned Source is always a VoidSource
        const voidRis = new Array();
        voidRis.push(new VoidSource_1.default("", index));
        if (tds.length === 0) {
            return voidRis;
        }
        for (let x = 0; x < tds.length; x++) {
            try {
                const reader = await this.resolveTD(tds[x]);
                if (reader !== null) {
                    ris.push(new WotSource_1.default(reader, propName, index));
                }
                else if (Config_1.default.IGNORE_TD_COLLECTION_ERROR) {
                    ris.push(new VoidSource_1.default("", index));
                }
                else {
                    return voidRis;
                }
            }
            catch (err) {
                if (err instanceof Error) {
                    Logger_1.default.getInstance().addLog(componentName, "ResolveTD resolveToISourceArr error: " + err.message, true);
                }
                else {
                    Logger_1.default.getInstance().addLog(componentName, "ResolveTD resolveToISourceArr error: " + err, true);
                }
            }
        }
        return ris;
    }
    async getThingFromDir(dir, dirIndex, parser) {
        const jsonpath = parser.getJsonPath();
        //console.log("getPrefixList-->",parser.getPrefixList());
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        //          HERE THE CODE to pass query params (json-path, geo, time ...) to the Directory
        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////
        var request_path = dir + path_getAll;
        if (jsonpath !== null) {
            request_path = dir + path_jsonPathQuery + encodeURIComponent(jsonpath);
        }
        Logger_1.default.getInstance().addLog(componentName, "request_path: " + request_path);
        try {
            const ris = await axios_1.default.get(request_path);
            if (ris.status === 200) {
                //console.log("HIT---->C");//ok
                //console.log(request_path, ris.data);
                const json_to_filter = ris.data;
                return this.resolveToISourceArr(json_to_filter, parser, dirIndex);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                Logger_1.default.getInstance().addLog(componentName, 'DirectoriesCollector error on Directory index:' + dirIndex + " Error: " + error.message, true);
            }
            else {
                Logger_1.default.getInstance().addLog(componentName, 'DirectoriesCollector error on Directory index' + dirIndex, true);
            }
        }
        const noTDs = new Array();
        noTDs.push(new VoidSource_1.default(dir, dirIndex));
        return noTDs;
    }
    async collectDirs(sources, parser) {
        const ris = new Map();
        const count = sources.length;
        for (let s = 0; s < sources.length; s++) {
            const realDirURL = sources[s];
            const indexDir = s;
            if (realDirURL !== undefined) {
                const tds = await this.getThingFromDir(realDirURL, indexDir, parser);
                ris.set(s + "_" + realDirURL, tds);
            }
            else {
                const noTDs = new Array();
                noTDs.push(new VoidSource_1.default(realDirURL, indexDir));
                ris.set(s + "_" + realDirURL, noTDs);
                Logger_1.default.getInstance().addLog(componentName, 'DirectoriesCollector miss a Directory for index:' + sources[s]);
            }
        }
        var countPunishedSource = 0;
        for (let key of ris.keys()) {
            const iSources = ris.get(key);
            if (iSources === undefined || iSources.length === 0) {
                countPunishedSource++;
            }
            else {
                for (let ss = 0; ss < iSources.length; ss++) {
                    if (iSources[ss].isPunished()) {
                        countPunishedSource++;
                        break;
                    }
                }
            }
        }
        Logger_1.default.getInstance().addLog(componentName, "Pre punished source: " + countPunishedSource + "/" + count);
        return ris;
    }
}
exports.default = DirectoriesCollector;
