"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TestEncoding_1 = __importDefault(require("./TestEncoding"));
test('TestEncoding.test01', async () => {
    const ris = await TestEncoding_1.default.test_01();
    expect(ris).toEqual(true);
});
test('TestEncoding.test02', async () => {
    const ris = await TestEncoding_1.default.test_02();
    expect(ris).toEqual(true);
});
test('TestEncoding.test03', async () => {
    const ris = await TestEncoding_1.default.test_03();
    expect(ris).toEqual(true);
});
test('TestEncoding.test04', async () => {
    const ris = await TestEncoding_1.default.test_04();
    expect(ris).toEqual(true);
});
test('TestEncoding.test05', async () => {
    const ris = await TestEncoding_1.default.test_05();
    expect(ris).toEqual(true);
});
test('TestEncoding.test06', async () => {
    const ris = await TestEncoding_1.default.test_06();
    expect(ris).toEqual(true);
});
test('TestEncoding.test07', async () => {
    const ris = await TestEncoding_1.default.test_07();
    expect(ris).toEqual(true);
});
test('TestEncoding.test08', async () => {
    const ris = await TestEncoding_1.default.test_08();
    expect(ris).toEqual(true);
});
test('TestEncoding.test09', async () => {
    const ris = await TestEncoding_1.default.test_09();
    expect(ris).toEqual(true);
});
test('TestEncoding.test10', async () => {
    const ris = await TestEncoding_1.default.test_10();
    expect(ris).toEqual(true);
});
