import TestConsStr from "./TestConsStr";
import TestUtils from "./TestUtils";

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

