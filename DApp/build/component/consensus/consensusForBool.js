"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoolSourceValues_1 = __importDefault(require("../../model/BoolSourceValues"));
const ScoreStruture_1 = __importDefault(require("./ScoreStruture"));
const VoidSource_1 = __importDefault(require("../../model/VoidSource"));
const Logger_1 = __importDefault(require("../Logger"));
const componentName = "ConsensusForBool";
function consensus(sourcesAndValues) {
    Logger_1.default.getInstance().addLog(componentName, "Using consensus alghoritm for BOOLEAN");
    const struct = new ScoreStruture_1.default();
    for (var x in sourcesAndValues) {
        const td = sourcesAndValues[x].getTemporalDistribution();
        const source = sourcesAndValues[x].getSource();
        if (!source.isPunished()) {
            for (var y in td) {
                struct.push(td[y].value.toString(), td[y].date, source);
            }
        }
    }
    //get best value
    const ris = struct.orderAndEvaluated();
    //reward soruces
    struct.rewardOtherSource();
    const tempJustForConvert = new BoolSourceValues_1.default(new VoidSource_1.default("", 0));
    return tempJustForConvert.parse(ris);
}
exports.default = consensus;
