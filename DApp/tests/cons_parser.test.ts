import QueryParserTest from "./QueryParserTest";

test('queryParserTest.test1', async () => {
    const ris = await QueryParserTest.test_01();
    expect(ris.tot).toEqual(ris.passed);
});


test('queryParserTest.test2', async () => {
    const ris = await QueryParserTest.test_02();
    expect(ris.tot).toEqual(ris.passed);
});


test('queryParserTest.test3', async () => {
    const ris = await QueryParserTest.test_03();
    expect(ris.tot).toEqual(ris.passed);
});
