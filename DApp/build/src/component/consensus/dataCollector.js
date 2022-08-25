"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = exports.consensus = void 0;
const NumberSourceValues_1 = __importDefault(require("../../model/NumberSourceValues"));
const StringSourceValues_1 = __importDefault(require("../../model/StringSourceValues"));
const BoolSourceValues_1 = __importDefault(require("../../model/BoolSourceValues"));
const consensusForNumber_1 = __importDefault(require("./consensusForNumber"));
const consensusForString_1 = __importDefault(require("./consensusForString"));
const consensusForBool_1 = __importDefault(require("./consensusForBool"));
const Result_1 = __importDefault(require("../../model/Result"));
const Config_1 = __importDefault(require("../../const/Config"));
const Types_1 = __importDefault(require("../../const/Types"));
const Logger_1 = __importDefault(require("../Logger"));
const componentName = "DataCollector";
function consensus(sources) {
    if (sources[0] instanceof NumberSourceValues_1.default) {
        return new Result_1.default((0, consensusForNumber_1.default)(sources).toString(), Types_1.default.TYPE_NUMBER, sources);
    }
    else if (sources[0] instanceof StringSourceValues_1.default) {
        return new Result_1.default((0, consensusForString_1.default)(sources), Types_1.default.TYPE_STRING, sources);
    }
    else if (sources[0] instanceof BoolSourceValues_1.default) {
        return new Result_1.default((0, consensusForBool_1.default)(sources).toString(), Types_1.default.TYPE_BOOLEAN, sources);
    }
    else {
        Logger_1.default.getInstance().addLog(componentName, "SourcesValue type not found for: " + sources[0].constructor.name, true);
        throw new Error("SourcesValue type not found for: " + sources[0].constructor.name);
    }
}
exports.consensus = consensus;
function collect(sources, cb) {
    const notAborted = new Set();
    Logger_1.default.getInstance().addLog(componentName, "collect started!");
    const askTo = (cbSYnc) => {
        // const keys= notAborted.keys();
        const needPunishment = new Array();
        var barier = 0;
        const sourcesCount = sources.length;
        // console.log("notAborted",notAborted);
        //console.log("notAborted.size",notAborted.size);//ok
        for (let s = 0; s < sources.length; s++) {
            const actualSource = sources[s];
            const key = actualSource.getSource().getIndex();
            //console.log("notAborted.has("+key+"):"+notAborted.has(key)); //ok
            if (notAborted.has(key)) {
                actualSource.addTemporalValue()
                    .then((ok) => {
                    if (!ok) {
                        needPunishment.push(key);
                        Logger_1.default.getInstance().addLog(componentName, "Source[" + key + "] ask, received not valid value.");
                    }
                    barier++;
                    if (barier >= sourcesCount) {
                        cbSYnc(needPunishment);
                    }
                })
                    .catch((err) => {
                    needPunishment.push(key);
                    Logger_1.default.getInstance().addLog(componentName, "Source[" + key + "] ask, ERROR: " + err.message);
                    barier++;
                    if (barier >= sourcesCount) {
                        cbSYnc(needPunishment);
                    }
                });
            }
            else {
                barier++;
                if (barier >= sourcesCount) {
                    cbSYnc(needPunishment);
                }
            }
        }
    };
    for (var s in sources) {
        const index = sources[s].getSource().getIndex();
        notAborted.add(index);
    }
    var countRequest = 0;
    const recursive = () => {
        countRequest++;
        if (countRequest > Config_1.default.AUTOCORRELATION) {
            //punish all the sources of the same Directory
            // that has at least one Source already punished
            for (var s in sources) {
                const index = sources[s].getSource().getIndex();
                if (!notAborted.has(index)) {
                    sources[s].getSource().punish();
                }
            }
            //console.log("DataCollectorOutput: ", sources); //ok
            cb(sources);
        }
        else {
            // console.log("recursive CALL"); //ok
            askTo((needPunishment) => {
                for (var x in needPunishment) {
                    const key = needPunishment[x];
                    if (notAborted.has(key)) {
                        notAborted.delete(key);
                    }
                }
                setTimeout(recursive, Config_1.default.T);
            });
        }
    };
    setTimeout(recursive, Config_1.default.T);
}
exports.collect = collect;
