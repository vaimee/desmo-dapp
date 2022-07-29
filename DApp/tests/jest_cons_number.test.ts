import TestConsNumb from "./TestConsNumb";
import TestUtils from "./TestUtils";

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

