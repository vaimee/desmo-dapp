"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoolSourceValues {
    constructor(source) {
        this.source = source;
        this.temporalDistribution = new Array();
        this.distribution = new Array();
    }
    parse(v) {
        const temp_str = v.toLocaleLowerCase().trim();
        if (temp_str === "true" || temp_str === "false") {
            if (temp_str === "true") {
                return true;
            }
            else {
                return false;
            }
        }
        else if (Number(v)) {
            return true;
        }
        else {
            return false;
        }
    }
    async addTemporalValue() {
        const v_str = await this.source.ask();
        if (v_str === null) {
            return false;
        }
        const parsed_v = this.parse(v_str);
        this.temporalDistribution.push({
            value: parsed_v,
            date: Date.now()
        });
        this.distribution.push(parsed_v);
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
            dist_size: this.temporalDistribution.length,
        };
    }
    toInfoString() {
        return this.toString() + ":" + JSON.stringify(this.getInfo());
    }
    toString() {
        return "BoolSourceValues[" + this.source.getIndex() + "]";
    }
}
exports.default = BoolSourceValues;
