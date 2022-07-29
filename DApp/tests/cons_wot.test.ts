import WotTest from "./WotTest";

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