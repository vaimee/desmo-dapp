"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("../component/Logger"));
const componentName = "WotSource";
class WotSource {
    constructor(reader, prop, index) {
        this.thing = reader;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3;
        this.propertyName = prop;
    }
    async ask() {
        //console.log("START"); //ok
        try {
            const reader = await this.thing.readProperty(this.propertyName);
            const ris = await reader.value();
            Logger_1.default.getInstance().addLog(componentName, "Ask for a value, response: " + ris);
            if (ris === null) {
                Logger_1.default.getInstance().addLog(componentName, "Not valid value getted by source: " + this.index, true);
                throw new Error("Not valid value getted by source: " + this.index);
            }
            return (ris).toString();
        }
        catch (err) {
            Logger_1.default.getInstance().addLog(componentName, "Error on ask: " + err, true);
            throw new Error("Error on ask: " + err);
        }
    }
    punish() {
        this.punished = true;
        this.score = 0;
    }
    setScore(s) {
        if (!this.punished && this.score > s) {
            this.score = s;
        }
    }
    getScore() {
        return this.score;
    }
    isPunished() {
        return this.punished;
    }
    getIndex() {
        return this.index;
    }
}
exports.default = WotSource;
