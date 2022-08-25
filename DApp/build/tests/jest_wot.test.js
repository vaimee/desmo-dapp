"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WotTest_1 = __importDefault(require("./WotTest"));
test('WotTest.test01', async () => {
    const ris = await WotTest_1.default.test_01();
    expect(ris).toEqual(true);
});
test('WotTest.test03', async () => {
    const ris = await WotTest_1.default.test_03();
    expect(ris).toEqual(true);
});
test('WotTest.test04', async () => {
    const ris = await WotTest_1.default.test_04();
    expect(ris).toEqual(true);
});
test('WotTest.test05', async () => {
    const ris = await WotTest_1.default.test_05();
    expect(ris).toEqual(true);
});
test('WotTest.test06', async () => {
    const ris = await WotTest_1.default.test_06();
    expect(ris).toEqual(true);
});
test('WotTest.test07', async () => {
    const ris = await WotTest_1.default.test_07();
    expect(ris).toEqual(true);
});
test('WotTest.test08', async () => {
    const ris = await WotTest_1.default.test_08();
    expect(ris).toEqual(true);
});
test('WotTest.test09', async () => {
    const ris = await WotTest_1.default.test_09();
    expect(ris).toEqual(true);
});
test('WotTest.test10', async () => {
    const ris = await WotTest_1.default.test_10();
    expect(ris).toEqual(true);
});
test('WotTest.test11', async () => {
    const ris = await WotTest_1.default.test_11();
    expect(ris).toEqual(true);
});
test('WotTest.test12', async () => {
    const ris = await WotTest_1.default.test_12();
    expect(ris).toEqual(true);
});
test('WotTest.test13', async () => {
    const ris = await WotTest_1.default.test_13();
    expect(ris).toEqual(true);
});
