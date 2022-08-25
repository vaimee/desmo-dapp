"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestConsBool_1 = __importDefault(require("./TestConsBool"));
const TestUtils_1 = __importDefault(require("./TestUtils"));
test('TestConsBool.test01', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_bool:test_03", TestConsBool_1.default.test_01, TestUtils_1.default.boolValidator);
    expect(ris).toEqual(true);
});
