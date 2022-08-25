"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VoidSource {
    constructor(url, index) {
        this.source = url;
        this.index = index;
    }
    async ask() {
        throw new Error("This is a VoidSource, will not return values with ask method.");
    }
    isPunished() {
        return true;
    }
    getIndex() {
        return this.index;
    }
    getScore() {
        return 0;
    }
    setScore(s) { }
    punish() { }
}
exports.default = VoidSource;
