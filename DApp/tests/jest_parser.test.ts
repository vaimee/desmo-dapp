import QueryParser from "../src/component/QueryParser";
import { IPrefix } from "../src/model/IQuery";
import {
    query_getter_01,
    query_getter_02,
    query_getter_03,
    query_getter_04,
    query_getter_05,
    query_invalid_01, query_invalid_02, query_invalid_03, query_invalid_04, query_invalid_05, query_invalid_06, query_invalid_07, query_invalid_08,
    query_invalid_09,
    query_valid_01, query_valid_02, query_valid_03, query_valid_04,
    query_valid_05, query_valid_06, query_valid_07, query_valid_08, query_valid_09, query_valid_10, query_valid_11
} from "./TestQueries";

function PrefixEqual(a: IPrefix[] | null, b: IPrefix[] | null): boolean {
    if (a != null && b != null && a != undefined && b != undefined) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val.abbreviation == b[index].abbreviation && val.completeURI == b[index].completeURI);

    }
    return false;
}

//-------------------------------------------
test('queryParserTest.test1', () => {
    console.log('queryParserTest.test1');
    const parser_valid: QueryParser = new QueryParser(query_valid_01);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test2', () => {
    console.log('queryParserTest.test2');
    const parser_valid: QueryParser = new QueryParser(query_valid_02);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test3', () => {
    console.log('queryParserTest.test3');
    const parser_valid: QueryParser = new QueryParser(query_valid_03);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test4', () => {
    console.log('queryParserTest.test4');
    const parser_valid: QueryParser = new QueryParser(query_valid_04);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});


test('queryParserTest.test5', () => {
    console.log('queryParserTest.test5');
    const parser_valid: QueryParser = new QueryParser(query_valid_05);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test6', () => {
    console.log('queryParserTest.test6');
    const parser_valid: QueryParser = new QueryParser(query_valid_06);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test7', () => {
    console.log('queryParserTest.test7');
    const parser_valid: QueryParser = new QueryParser(query_valid_07);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test8', () => {
    console.log('queryParserTest.test8');
    const parser_valid: QueryParser = new QueryParser(query_valid_08);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test9', () => {
    console.log('queryParserTest.test9');
    const parser_valid: QueryParser = new QueryParser(query_valid_09);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= false;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test10', () => {
    console.log('queryParserTest.test10');
    const parser_valid: QueryParser = new QueryParser(query_valid_10);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= false;
    parser_valid._GEOFILTER_UNIT_IS_URI= false;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});

test('queryParserTest.test11', () => {
    console.log('queryParserTest.test11');
    const parser_valid: QueryParser = new QueryParser(query_valid_11);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= false;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(true);
});


test('queryParserTest.test12', () => {
    console.log('queryParserTest.test12');
    const parser_valid: QueryParser = new QueryParser(query_invalid_01);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test13', () => {
    console.log('queryParserTest.test13');
    const parser_valid: QueryParser = new QueryParser(query_invalid_02);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test14', () => {
    console.log('queryParserTest.test14');
    const parser_valid: QueryParser = new QueryParser(query_invalid_03);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test15', () => {
    console.log('queryParserTest.test15');
    const parser_valid: QueryParser = new QueryParser(query_invalid_04);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test16', () => {
    console.log('queryParserTest.test16');
    const parser_valid: QueryParser = new QueryParser(query_invalid_05);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test17', () => {
    console.log('queryParserTest.test17');
    const parser_valid: QueryParser = new QueryParser(query_invalid_06);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test18', () => {
    console.log('queryParserTest.test18');
    const parser_valid: QueryParser = new QueryParser(query_invalid_07);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});

test('queryParserTest.test19', () => {
    console.log('queryParserTest.test19');
    const parser_valid: QueryParser = new QueryParser(query_invalid_08);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});


test('queryParserTest.test20', () => {
    console.log('queryParserTest.test20');
    const parser_valid: QueryParser = new QueryParser(query_invalid_09);
    parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
    parser_valid._PROPERTY_UNIT_IS_URI= true;
    parser_valid._GEOFILTER_UNIT_IS_URI= true;
    parser_valid.parse();
    expect(parser_valid.isValid()).toEqual(false);
});



test('queryParserTest.test21', () => {
    console.log('queryParserTest.test21');
    const parser_getter: QueryParser = new QueryParser(query_getter_01);
    parser_getter.parse();
    expect(parser_getter.isAskingForNumber()).toEqual(true);
    expect(parser_getter.getType()).toEqual(1);
});

test('queryParserTest.test22', () => {
    console.log('queryParserTest.test22');
    const parser_getter: QueryParser = new QueryParser(query_getter_02);
    parser_getter.parse();
    expect(parser_getter.isAskingForNumber()).toEqual(true);
    expect(parser_getter.getType()).toEqual(0);
});

test('queryParserTest.test23', () => {
    console.log('queryParserTest.test23');
    const parser_getter: QueryParser = new QueryParser(query_getter_03);
    parser_getter.parse();
    expect(parser_getter.isAskingForBoolean()).toEqual(true);
    expect(parser_getter.getType()).toEqual(2);
});

test('queryParserTest.test24', () => {
    console.log('queryParserTest.test24');
    const parser_getter: QueryParser = new QueryParser(query_getter_04);
    parser_getter.parse();
    expect(parser_getter.isAskingForString()).toEqual(true);
    expect(parser_getter.getType()).toEqual(3);
});

test('queryParserTest.test25', () => {
    console.log('queryParserTest.test25');
     const parser_getter: QueryParser = new QueryParser(query_getter_05);
    parser_getter.parse();
    expect(parser_getter.getJsonPath()).toEqual("$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]");
    
    //test getPrefixList
    const CorrectPrefix: IPrefix[] = [{ abbreviation: "desmo", completeURI: "https://desmo.vaimee.it/" }, { abbreviation: "qudt", completeURI: "http://qudt.org/schema/qudt/" }, { abbreviation: "onto", completeURI: "http://onto.org/ontologies/base/" }];
    expect(PrefixEqual(parser_getter.getPrefixList(), CorrectPrefix)).toEqual(true);

    expect(parser_getter.getPropertyIdentifier()).toEqual("desmo:OutdoorTemperature");

    expect(parser_getter.getPropertyUnit()).toEqual("qudt:DEG_C");
    
    expect(parser_getter.getPropertyDatatype()).toEqual(1);
    
});

test('queryParserTest.test26', () => {
    console.log('queryParserTest.test26');
    const jsonQ = JSON.parse(query_valid_06);
    const qp = new QueryParser(query_valid_06);
    expect(qp.getDynamicFilter()).toEqual(jsonQ.dynamicFilter);
    expect(qp.getGeoFilterRegion()).toEqual(jsonQ.geoFilter.region);
    expect(qp.getGeoFilterAltitudeRange()).toEqual(jsonQ.geoFilter.altitudeRange);
    expect(qp.getTimeFilter()).toEqual(jsonQ.timeFilter);
});