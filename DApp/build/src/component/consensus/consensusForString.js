"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScoreStruture_1 = __importDefault(require("./ScoreStruture"));
const Logger_1 = __importDefault(require("../Logger"));
const componentName = "ConsensusForString";
function consensus(sourcesAndValues) {
    Logger_1.default.getInstance().addLog(componentName, "Using consensus alghoritm for STRINGS");
    const struct = new ScoreStruture_1.default();
    for (var x in sourcesAndValues) {
        const td = sourcesAndValues[x].getTemporalDistribution();
        const source = sourcesAndValues[x].getSource();
        if (!source.isPunished()) {
            for (var y in td) {
                struct.push(td[y].value, td[y].date, source);
            }
        }
    }
    if (struct.getSize() < 1) {
        Logger_1.default.getInstance().addLog(componentName, "Impossible to reach consensus code[05]: not enough  valid data.", true);
        throw new Error("Impossible to reach consensus code[05]: not enough  valid data.");
    }
    //get best value
    const ris = struct.orderAndEvaluated();
    //reward soruces
    struct.rewardOtherSource();
    return ris;
}
exports.default = consensus;
