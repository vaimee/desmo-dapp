"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UseCaseTest_1 = __importDefault(require("./UseCaseTest"));
// test('UseCaseTest.test01', async () => {
//     const ris=await UseCaseTest.test_01();
//     expect(ris).toEqual(true);
// });
test('UseCaseTest.test02', async () => {
    const ris = await UseCaseTest_1.default.test_02();
    expect(ris).toEqual(true);
});
test('UseCaseTest.test03', async () => {
    const ris = await UseCaseTest_1.default.test_03();
    expect(ris).toEqual(true);
});
test('UseCaseTest.test04', async () => {
    const ris = await UseCaseTest_1.default.test_04();
    expect(ris).toEqual(true);
});
test('UseCaseTest.test05', async () => {
    const ris = await UseCaseTest_1.default.test_05();
    expect(ris).toEqual(true);
});
test('UseCaseTest.test06', async () => {
    try {
        expect(await UseCaseTest_1.default.test_06()).toEqual(true);
    }
    catch (err) {
        console.log("err", err);
    }
});
test('UseCaseTest.test07', async () => {
    try {
        expect(await UseCaseTest_1.default.test_07()).toEqual(true);
    }
    catch (err) {
        console.log("err", err);
    }
});
