import QueryParserTest from "./QueryParserTest";
import QueryParser from "../src/component/QueryParser";
import {
    query_valid_06
} from "./TestQueries";

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

test('queryParserTest.test4', async () => {
    const jsonQ = JSON.parse(query_valid_06);
    const qp = new QueryParser(query_valid_06);
    expect(qp.getDynamicFilter()).toEqual(jsonQ.dynamicFilter);
    expect(qp.getGeoFilterRegion()).toEqual(jsonQ.geoFilter.region);
    expect(qp.getGeoFilterAltitudeRange()).toEqual(jsonQ.geoFilter.altitudeRange);
    expect(qp.getTimeFilter()).toEqual(jsonQ.timeFilter);
});

