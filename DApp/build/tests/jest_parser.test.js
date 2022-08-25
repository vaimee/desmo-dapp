"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QueryParserTest_1 = __importDefault(require("./QueryParserTest"));
const QueryParser_1 = __importDefault(require("../src/component/QueryParser"));
const TestQueries_1 = require("./TestQueries");
test('queryParserTest.test1', async () => {
    const ris = await QueryParserTest_1.default.test_01();
    expect(ris.tot).toEqual(ris.passed);
});
test('queryParserTest.test2', async () => {
    const ris = await QueryParserTest_1.default.test_02();
    expect(ris.tot).toEqual(ris.passed);
});
test('queryParserTest.test3', async () => {
    const ris = await QueryParserTest_1.default.test_03();
    expect(ris.tot).toEqual(ris.passed);
});
test('queryParserTest.test4', async () => {
    const jsonQ = JSON.parse(TestQueries_1.query_valid_06);
    const qp = new QueryParser_1.default(TestQueries_1.query_valid_06);
    expect(qp.getDynamicFilter()).toEqual(jsonQ.dynamicFilter);
    expect(qp.getGeoFilterRegion()).toEqual(jsonQ.geoFilter.region);
    expect(qp.getGeoFilterAltitudeRange()).toEqual(jsonQ.geoFilter.altitudeRange);
    expect(qp.getTimeFilter()).toEqual(jsonQ.timeFilter);
});
