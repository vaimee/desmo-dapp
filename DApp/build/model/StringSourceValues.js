"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringSourceValues {
    constructor(source) {
        this.source = source;
        this.temporalDistribution = new Array();
        this.distribution = new Array();
    }
    parse(v) {
        return v;
    }
    async addTemporalValue() {
        const v_str = await this.source.ask();
        if (v_str === null) {
            return false;
        }
        this.temporalDistribution.push({
            value: v_str,
            date: Date.now()
        });
        this.distribution.push(v_str);
        /*
            We will use just "this.distribution"
            but in future we can use  "this.temporalDistribution"
            in order to calculate a better "probability" for the column of the
            matrix (look at "algorithm.md" and at "consensusForString.ts")
        */
        return true;
    }
    getTemporalDistribution() {
        return this.temporalDistribution;
    }
    getSource() {
        return this.source;
    }
    getInfo() {
        return {
            dist_size: this.temporalDistribution.length
        };
    }
    toInfoString() {
        return this.toString() + ":" + JSON.stringify(this.getInfo());
    }
    toString() {
        return "StringSourceValues[" + this.source.getIndex() + "]";
    }
}
exports.default = StringSourceValues;
