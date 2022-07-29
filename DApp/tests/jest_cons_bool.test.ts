import TestConsBool from "./TestConsBool";
import TestUtils from "./TestUtils";

test('TestConsBool.test01', async () => {
    const ris=await TestUtils.assertTest("Consensus_on_bool:test_03",TestConsBool.test_01,TestUtils.boolValidator);
    expect(ris).toEqual(true);
});
