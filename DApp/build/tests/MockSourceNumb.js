"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Source_1 = __importDefault(require("../src/model/Source"));
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class MockSourceNumb extends Source_1.default {
    constructor(id, index, v) {
        super(id, index);
        this.actual = -1;
        this.values = v;
    }
    async ask() {
        this.actual++;
        //console.log("ASK["+this.source+"]: "+ this.actual);
        const temp = this.values[this.actual];
        await delay(Math.trunc((Math.random() * 500)));
        if (temp === null) {
            throw new Error("Not valid value getted by source: " + this.source);
        }
        else {
            return temp.toString();
        }
    }
}
exports.default = MockSourceNumb;
