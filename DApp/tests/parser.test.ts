import QueryParser from "../src/component/QueryParser";
import { IPrefix,IGeoCircle, IGeoPosition, IGeoPolygon } from "../src/model/IQuery";
import {
    query_getter_01,query_getter_02,
    query_getter_03,query_getter_04,
    query_getter_05,query_getter_06,
    query_getter_07,
    query_invalid_01, query_invalid_02, query_invalid_03, query_invalid_04, 
    query_invalid_05, query_invalid_06, query_invalid_07, query_invalid_08,
    query_invalid_09,
    query_valid_01, query_valid_02, query_valid_03, query_valid_04,
    query_valid_05, query_valid_06, query_valid_07, query_valid_08, 
    query_valid_09, query_valid_10, query_valid_11,
} from "./mocks/TestQueries";

function PrefixEqual(a: IPrefix[] | null, b: IPrefix[] | null): boolean {
    if (a != null && b != null && a != undefined && b != undefined) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val.abbreviation == b[index].abbreviation && val.completeURI == b[index].completeURI);

    }
    return false;
}


describe('QueryParser tests', () => {

    describe('Valid queries', () => {
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_01);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_02);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_03);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });
        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_04);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });
                
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_05);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });
                
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_06);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

                        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_07);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

                        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_08);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

                        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_09);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= false;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

                        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_10);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= false;
            parser_valid._GEOFILTER_UNIT_IS_URI= false;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });

                        
        it('the query should be valid and parsed', async () => {
            const parser_valid: QueryParser = new QueryParser(query_valid_11);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= false;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(true);
        });
    });

    describe('Not valid queries', () => {
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_01);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_02);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_03);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_04);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_05);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_06);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_07);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_08);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });

        
        it("the query shouldn't be valid", async () => {
            const parser_valid: QueryParser = new QueryParser(query_invalid_09);
            parser_valid._PROPERTY_IDENTIFIER_IS_URI= true;
            parser_valid._PROPERTY_UNIT_IS_URI= true;
            parser_valid._GEOFILTER_UNIT_IS_URI= true;
            parser_valid.parse();
            expect(parser_valid.isValid()).toBe(false);
        });
    });


    
    describe('Parser and getters', () => {
        it("the query should be valid and parsed, testing type pos float", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_01);
            parser_getter.parse();
            expect(parser_getter.isAskingForNumber()).toBe(true);
            expect(parser_getter.getType()).toBe(1);
        });

        it("the query should be valid and parsed, testing type pos int", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_02);
            parser_getter.parse();
            expect(parser_getter.isAskingForNumber()).toBe(true);
            expect(parser_getter.getType()).toBe(0);
        });
        
        it("the query should be valid and parsed, testing type neg int", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_03);
            parser_getter.parse();
            expect(parser_getter.isAskingForNumber()).toBe(true);
            expect(parser_getter.getType()).toBe(2);
        });

        it("the query should be valid and parsed, testing type neg float", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_04);
            parser_getter.parse();
            expect(parser_getter.isAskingForNumber()).toBe(true);
            expect(parser_getter.getType()).toBe(3);
        });

        it("the query should be valid and parsed, testing type boolean", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_06);
            parser_getter.parse();
            expect(parser_getter.isAskingForBoolean()).toBe(true);
            expect(parser_getter.getType()).toBe(5);
        });

        it("the query should be valid and parsed, testing type string", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_07);
            parser_getter.parse();
            expect(parser_getter.isAskingForString()).toBe(true);
            expect(parser_getter.getType()).toBe(4);
        });


        it("the query should be valid and parsed, testing getters", async () => {
            const parser_getter: QueryParser = new QueryParser(query_getter_05);
            parser_getter.parse();
            expect(parser_getter.getJsonPath()).toBe("$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]");
            
            //test getPrefixList
            const CorrectPrefix: IPrefix[] = [{ abbreviation: "desmo", completeURI: "https://desmo.vaimee.it/" }, { abbreviation: "qudt", completeURI: "http://qudt.org/schema/qudt/" }, { abbreviation: "onto", completeURI: "http://onto.org/ontologies/base/" }];
            expect(PrefixEqual(parser_getter.getPrefixList(), CorrectPrefix)).toBe(true);
        
            expect(parser_getter.getPropertyIdentifier()).toBe("desmo:OutdoorTemperature");
        
            expect(parser_getter.getPropertyUnit()).toBe("qudt:DEG_C");
            
            expect(parser_getter.getPropertyDatatype()).toBe(1);
        });

        
        it("the query should be valid and parsed, testing getters", async () => {
            const jsonQ = JSON.parse(query_valid_06);
            const qp = new QueryParser(query_valid_06);
            expect(qp.getDynamicFilter()).toBe(jsonQ.dynamicFilter);
            expect(qp.getGeoFilterRegion()).toEqual(jsonQ.geoFilter.region);
            expect(qp.getGeoFilterAltitudeRange()).toEqual(jsonQ.geoFilter.altitudeRange);
            expect(qp.getTimeFilter()).toEqual(jsonQ.timeFilter);
        });

    });
       
    describe('Parser.convertFromArgs', () => {
        
        it("the query should be valid and parsed, just necessary parameters", async () => {
            const jsonq = JSON.parse(query_getter_01);
            const args =["","","requestID",jsonq.property.identifier,jsonq.property.unit,jsonq.property.datatype];
            const parser = new QueryParser(QueryParser.convertFromArgs(args));
            parser.parse();
            expect(parser.isAskingForNumber()).toBe(true);
            expect(parser.getType()).toBe(1);
            expect(parser.getPropertyIdentifier()).toBe("desmo:OutdoorTemperature");
            expect(parser.getPropertyUnit()).toBe("qudt:DEG_C");
        });
        
        it("the query should be valid and parsed, prfix lists", async () => {
            const jsonq = JSON.parse(query_getter_01);
            const prefix1 =jsonq.prefixList[0].abbreviation+":"+jsonq.prefixList[0].completeURI;
            const prefix2 =jsonq.prefixList[1].abbreviation+":"+jsonq.prefixList[1].completeURI;
            const prefix3 =jsonq.prefixList[2].abbreviation+":"+jsonq.prefixList[2].completeURI;
            const args =["","","requestID",jsonq.property.identifier,jsonq.property.unit,jsonq.property.datatype,"--prefixList",prefix1,prefix2,prefix3];
            const parser = new QueryParser(QueryParser.convertFromArgs(args));
            parser.parse();
            expect(parser.isAskingForNumber()).toBe(true);
            expect(parser.getType()).toBe(1);
            expect(parser.getPropertyIdentifier()).toBe("desmo:OutdoorTemperature");
            expect(parser.getPropertyUnit()).toBe("qudt:DEG_C");
            expect(parser.getPrefixList()===null).toBe(false);
            expect( parser.getPrefixList()![0].abbreviation).toBe(jsonq.prefixList[0].abbreviation);
            expect( parser.getPrefixList()![1].abbreviation).toBe(jsonq.prefixList[1].abbreviation);
            expect( parser.getPrefixList()![2].abbreviation).toBe(jsonq.prefixList[2].abbreviation);
            expect( parser.getPrefixList()![0].completeURI).toBe(jsonq.prefixList[0].completeURI);
            expect( parser.getPrefixList()![1].completeURI).toBe(jsonq.prefixList[1].completeURI);
            expect( parser.getPrefixList()![2].completeURI).toBe(jsonq.prefixList[2].completeURI);
        });

           
        it("the query should be valid and parsed, prefixlist, staticFilter, dynamicFilter, geoFilter(geoCircle+geoAltitude)", async () => {
            const jsonq = JSON.parse(query_valid_06);
            const prefix1 =jsonq.prefixList[0].abbreviation+":"+jsonq.prefixList[0].completeURI;
            const prefix2 =jsonq.prefixList[1].abbreviation+":"+jsonq.prefixList[1].completeURI;
            const prefix3 =jsonq.prefixList[2].abbreviation+":"+jsonq.prefixList[2].completeURI;
            const args =["","","requestID",jsonq.property.identifier,jsonq.property.unit,jsonq.property.datatype,"--prefixList",prefix1,prefix2,prefix3,
            "--staticFilter",jsonq.staticFilter,
            "--dynamicFilter",jsonq.dynamicFilter,
            "--geoAltitude", jsonq.geoFilter.altitudeRange.min,jsonq.geoFilter.altitudeRange.max,jsonq.geoFilter.altitudeRange.unit,
            "--geoCircle", jsonq.geoFilter.region.center.latitude , jsonq.geoFilter.region.center.longitude , jsonq.geoFilter.region.radius.value , jsonq.geoFilter.region.radius.unit
            ];
            const parser = new QueryParser(QueryParser.convertFromArgs(args));
            parser.parse();
            expect(parser.isAskingForNumber()).toBe(true);
            expect(parser.getType()).toBe(1);
            expect(parser.getPropertyIdentifier()).toBe("desmo:OutdoorTemperature");
            expect(parser.getPropertyUnit()).toBe("qudt:DEG_C");
            expect(parser.getPrefixList()===null).toBe(false);
            expect( parser.getPrefixList()![0].abbreviation).toBe(jsonq.prefixList[0].abbreviation);
            expect( parser.getPrefixList()![1].abbreviation).toBe(jsonq.prefixList[1].abbreviation);
            expect( parser.getPrefixList()![2].abbreviation).toBe(jsonq.prefixList[2].abbreviation);
            expect( parser.getPrefixList()![0].completeURI).toBe(jsonq.prefixList[0].completeURI);
            expect( parser.getPrefixList()![1].completeURI).toBe(jsonq.prefixList[1].completeURI);
            expect( parser.getPrefixList()![2].completeURI).toBe(jsonq.prefixList[2].completeURI);

            expect( parser.getJsonPath()).toBe(jsonq.staticFilter);
            expect( parser.getDynamicFilter()).toBe(jsonq.dynamicFilter);
            expect( parser.getGeoFilterRegion()===null).toBe(false);
            expect(parser.getRawGeoFilter()===undefined).toBe(false);
            expect(parser.getRawGeoFilter()?.region).toStrictEqual(jsonq.geoFilter.region);
            expect(parser.getRawGeoFilter()?.altitudeRange).toStrictEqual(jsonq.geoFilter.altitudeRange);
        });

        it("the query should be valid and parsed, prefixlist, geoFilter(vertices+geoAltitude)", async () => {
            const jsonq = JSON.parse(query_valid_08);
            const prefix1 =jsonq.prefixList[0].abbreviation+":"+jsonq.prefixList[0].completeURI;
            const prefix2 =jsonq.prefixList[1].abbreviation+":"+jsonq.prefixList[1].completeURI;
            const prefix3 =jsonq.prefixList[2].abbreviation+":"+jsonq.prefixList[2].completeURI;
            const args =["","","requestID",jsonq.property.identifier,jsonq.property.unit,jsonq.property.datatype,"--prefixList",prefix1,prefix2,prefix3,
            "--geoAltitude", jsonq.geoFilter.altitudeRange.min,jsonq.geoFilter.altitudeRange.max,jsonq.geoFilter.altitudeRange.unit,
            "--geoPolygon", jsonq.geoFilter.region.vertices[0].latitude , jsonq.geoFilter.region.vertices[0].longitude , 
            jsonq.geoFilter.region.vertices[1].latitude , jsonq.geoFilter.region.vertices[1].longitude,
            jsonq.geoFilter.region.vertices[2].latitude , jsonq.geoFilter.region.vertices[2].longitude  
            ];
            const parser = new QueryParser(QueryParser.convertFromArgs(args));
            parser.parse();
            expect(parser.isAskingForNumber()).toBe(true);
            expect(parser.getType()).toBe(1);
            expect(parser.getPropertyIdentifier()).toBe("desmo:OutdoorTemperature");
            expect(parser.getPropertyUnit()).toBe("qudt:DEG_C");
            expect(parser.getPrefixList()===null).toBe(false);
            expect( parser.getPrefixList()![0].abbreviation).toBe(jsonq.prefixList[0].abbreviation);
            expect( parser.getPrefixList()![1].abbreviation).toBe(jsonq.prefixList[1].abbreviation);
            expect( parser.getPrefixList()![2].abbreviation).toBe(jsonq.prefixList[2].abbreviation);
            expect( parser.getPrefixList()![0].completeURI).toBe(jsonq.prefixList[0].completeURI);
            expect( parser.getPrefixList()![1].completeURI).toBe(jsonq.prefixList[1].completeURI);
            expect( parser.getPrefixList()![2].completeURI).toBe(jsonq.prefixList[2].completeURI);

            expect( parser.getGeoFilterRegion()===null).toBe(false);
            expect(parser.getRawGeoFilter()===undefined).toBe(false);
            expect(parser.getRawGeoFilter()?.region).toStrictEqual(jsonq.geoFilter.region);
            expect(parser.getRawGeoFilter()?.altitudeRange).toStrictEqual(jsonq.geoFilter.altitudeRange);
        });
        

      

    });
   
});