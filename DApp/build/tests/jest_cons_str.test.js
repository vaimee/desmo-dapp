"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestConsStr_1 = __importDefault(require("./TestConsStr"));
const TestUtils_1 = __importDefault(require("./TestUtils"));
test('TestConsStr.test01', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_string:test_01", TestConsStr_1.default.test_01, TestUtils_1.default.strValidator);
    expect(ris).toEqual(true);
});
test('TestConsStr.test02', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_string:test_02", TestConsStr_1.default.test_02, TestUtils_1.default.strValidator);
    expect(ris).toEqual(true);
});
test('TestConsStr.test03', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_string:test_03", TestConsStr_1.default.test_03, TestUtils_1.default.strValidator);
    expect(ris).toEqual(true);
});
