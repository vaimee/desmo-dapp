import TestEncoding from "./TestEncoding";
import TestUtils from "./TestUtils";

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

test('TestEncoding.test05', async () => {
    const ris=await TestEncoding.test_05();
    expect(ris).toEqual(true);
});
