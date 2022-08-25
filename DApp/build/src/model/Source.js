"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Source {
    constructor(url, index) {
        this.source = url;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3;
    }
    async ask() {
        //here the code to get the value from the Directory
        console.log("WIP: Source.ask is not implemented yet");
        if (Math.random() > 0.2) {
            return Math.trunc(Math.random() * 100).toString();
        }
        throw new Error("Not valid value getted by source: " + this.source);
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
exports.default = Source;
