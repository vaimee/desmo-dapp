"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = __importDefault(require("../const/Types"));
function getPrecision(a) {
    if (!isFinite(a))
        return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
class Result {
    constructor(value, type, sourcesValues) {
        this.value = value;
        this.type = type;
        this.sources = new Map();
        for (let s in sourcesValues) {
            const score = sourcesValues[s].getSource().getScore();
            const index = sourcesValues[s].getSource().getIndex();
            if (this.sources.has(index)) {
                const _reward = this.sources.get(index);
                if (_reward !== undefined && _reward > score) {
                    this.sources.set(index, score);
                }
            }
            else {
                this.sources.set(index, score);
            }
        }
    }
    getValue() {
        return this.value;
    }
    getType() {
        return this.type;
    }
    getScores() {
        return this.sources;
    }
    getEncodedValue(encoder) {
        //###########################Econde result
        // const _encoder = new EncoderManual(this.sources);
        encoder.setSources(this.sources);
        if (this.type === Types_1.default.TYPE_NUMBER) {
            const num = Number(this.value);
            const precision = getPrecision(num);
            if (precision > 0) {
                const intvalue = Math.trunc(num * (precision ** 10));
                return encoder.encodeNumber(intvalue, precision);
            }
            else {
                return encoder.encodeNumber(num, 0);
            }
        }
        else if (this.type === Types_1.default.TYPE_STRING) {
            return encoder.encodeString(this.value);
        }
        else if (this.type === Types_1.default.TYPE_BOOLEAN) {
            return encoder.encodeString(this.value.toString());
        }
        else {
            throw new Error("Result.getEncodedValue: type not found for: " + this.type);
        }
    }
    toString() {
        return "Value: " + this.value + "; Type: " + this.type + "; Sources: " + this.sources.size + ".";
    }
}
exports.default = Result;
