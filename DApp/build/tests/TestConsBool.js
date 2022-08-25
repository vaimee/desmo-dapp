"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BoolSourceValues_1 = __importDefault(require("../src/model/BoolSourceValues"));
const Config_1 = __importDefault(require("../src/const/Config"));
const MockSourceBool_1 = __importDefault(require("./MockSourceBool"));
const dataCollector_1 = require("../src/component/consensus/dataCollector");
const run_test = function (sources, cb) {
    (0, dataCollector_1.collect)(sources, (s) => {
        console.log("\n###########################Sources after collect");
        for (var x in s) {
            console.log(s[x].toInfoString());
        }
        var matrix = "";
        for (var x in sources) {
            for (var y in sources[x].distribution) {
                matrix += "|\t" + sources[x].distribution[y] + "\t";
            }
            matrix += "|\n";
        }
        console.log(matrix);
        const value = (0, dataCollector_1.consensus)(s).getValue();
        var scoreSources = "| ";
        for (var x in sources) {
            const index = sources[x].getSource().getIndex();
            const score = sources[x].getSource().getScore();
            scoreSources += index + ": " + score + " | ";
        }
        console.log("################################################\n");
        console.log("ScoreSources: " + scoreSources);
        console.log("Value: " + value);
        cb(value);
    });
};
const generic_test = function (valueMatrix, cb) {
    if (Config_1.default.AUTOCORRELATION !== valueMatrix[0].length) {
        console.log("TEST aborted! AUTOCORRELATION is not eq to the MockSourceBool length!");
        console.log("The text matrix is " + valueMatrix.length + "x" + valueMatrix[0].length);
    }
    else {
        // console.log("###########TEST matrix:",valueMatrix);
        const sources = new Array();
        for (var x = 0; x < valueMatrix.length; x++) {
            sources.push(new BoolSourceValues_1.default(new MockSourceBool_1.default("Source_" + x, x, valueMatrix[x])));
        }
        run_test(sources, cb);
    }
};
const test_01 = function (cb) {
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("\n+++++++++++++++++++++TEST 01+++++++++++++++++++++");
    console.log("Start TEST consensus on BoolSourceValues 6 source (all good)");
    //row   ->source values
    //cell  ->is a value at time "t" of the source
    const valueMatrix = [
        [true, true, true, false],
        [true, true, true, true],
        [false, true, false, false],
        [true, true, false, true],
        [false, false, false, false],
        [false, false, true, false],
    ];
    generic_test(valueMatrix, cb);
};
exports.default = {
    test_01: test_01,
};
