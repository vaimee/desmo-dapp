import TestConsNumb from "./TestConsNumb";
import TestConsStr from "./TestConsStr";
import TestConsBool from "./TestConsBool";
import TestEncoding from "./TestEncoding";
import UseCaseTest from "./UseCaseTest";
import QueryParserTest from "./QueryParserTest";
import WotTest from "./WotTest";
import TestUtils from "./TestUtils";


test('queryParserTest.test1', async () => {
        const ris= await QueryParserTest.test_01();
        expect(ris.tot).toEqual(ris.passed);
});


test('queryParserTest.test2', async () => {
    const ris= await QueryParserTest.test_02();
    expect(ris.tot).toEqual(ris.passed);
});


test('queryParserTest.test3', async () => {
    const ris= await QueryParserTest.test_03();
    expect(ris.tot).toEqual(ris.passed);
});


test('TestConsNumb.test01', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_01",TestConsNumb.test_01,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test02', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_02",TestConsNumb.test_02,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});


test('TestConsNumb.test03', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_03",TestConsNumb.test_03,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test04', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_04",TestConsNumb.test_04,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsNumb.test05', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_number:test_05",TestConsNumb.test_05,TestUtils.numberValidator);
    expect(ris).toEqual(true);
});

test('TestConsStr.test01', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_string:test_01",TestConsStr.test_01,TestUtils.strValidator);
    expect(ris).toEqual(true);
});

test('TestConsStr.test02', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_string:test_02",TestConsStr.test_02,TestUtils.strValidator);
    expect(ris).toEqual(true);
});

test('TestConsStr.test03', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_string:test_03",TestConsStr.test_03,TestUtils.strValidator);
    expect(ris).toEqual(true);
});


test('TestConsBool.test01', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_bool:test_03",TestConsBool.test_01,TestUtils.boolValidator);
    expect(ris).toEqual(true);
});

test('TestEncoding.test01', async () => {
    const ris=await TestEncoding.test_01();
    expect(ris).toEqual(true);
});

test('TestEncoding.test02', async () => {
    const ris=await TestEncoding.test_02();
    expect(ris).toEqual(true);
});

test('TestEncoding.test03', async () => {
    const ris=await TestEncoding.test_03();
    expect(ris).toEqual(true);
});

test('TestEncoding.test04', async () => {
    const ris=await TestEncoding.test_04();
    expect(ris).toEqual(true);
});

test('WotTest.test01', async () => {
    const ris=await WotTest.test_01();
    expect(ris).toEqual(true);
});

test('WotTest.test03', async () => {
    const ris=await WotTest.test_03();
    expect(ris).toEqual(true);
});

test('WotTest.test04', async () => {
    const ris=await WotTest.test_04();
    expect(ris).toEqual(true);
});

test('WotTest.test05', async () => {
    const ris=await WotTest.test_05();
    expect(ris).toEqual(true);
});

test('WotTest.test06', async () => {
    const ris=await WotTest.test_06();
    expect(ris).toEqual(true);
});

// test('UseCaseTest.test01', async () => {
//     const ris=await UseCaseTest.test_01();
//     expect(ris).toEqual(true);
// });

test('UseCaseTest.test02', async () => {
    const ris=await UseCaseTest.test_02();
    expect(ris).toEqual(true);
});

