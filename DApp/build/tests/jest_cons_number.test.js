"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestConsNumb_1 = __importDefault(require("./TestConsNumb"));
const TestUtils_1 = __importDefault(require("./TestUtils"));
test('TestConsNumb.test01', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_number:test_01", TestConsNumb_1.default.test_01, TestUtils_1.default.numberValidator);
    expect(ris).toEqual(true);
});
test('TestConsNumb.test02', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_number:test_02", TestConsNumb_1.default.test_02, TestUtils_1.default.numberValidator);
    expect(ris).toEqual(true);
});
test('TestConsNumb.test03', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_number:test_03", TestConsNumb_1.default.test_03, TestUtils_1.default.numberValidator);
    expect(ris).toEqual(true);
});
test('TestConsNumb.test04', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_number:test_04", TestConsNumb_1.default.test_04, TestUtils_1.default.numberValidator);
    expect(ris).toEqual(true);
});
test('TestConsNumb.test05', async () => {
    const ris = await TestUtils_1.default.assertTest("Consensus_on_number:test_05", TestConsNumb_1.default.test_05, TestUtils_1.default.numberValidator);
    expect(ris).toEqual(true);
});
