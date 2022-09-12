import IResult from "../src/model/IResult";
import { collect, consensus } from "../src/component/consensus/dataCollector";
import ISourceValues from "../src/model/ISourceValues";
import BoolSourceValues from "../src/model/BoolSourceValues";
import StringSourceValues from "../src/model/StringSourceValues";
import NumberSourceValues from "../src/model/NumberSourceValues";
import MockSourceBool from "./mocks/MockSourceBool";
import MockSourceStr from "./mocks/MockSourceStr";
import MockSourceNumb from "./mocks/MockSourceNumb";
import {ValueType} from "../src/const/ValueType";

async function runConsensus(sources:ISourceValues[] ): Promise<IResult> {
    const s = await collect(sources);
    return consensus(s);
}
describe('Consensus tests', () => {
    describe('Boolean consensus', () => {
        it('should reach a consensus with 6 BooleanSources', async () => {
            const valueMatrix = [
                [true, true, true, false],
                [true, true, true, true],
                [false, true, false, false],
                [true, true, false, true],
                [false, false, false, false],
                [false, false, true, false],
            ];
            const sources = valueMatrix.map( (inputBooleans, index) => 
                new BoolSourceValues(new MockSourceBool("Source_" + index, index, inputBooleans))
            );

            const result = await runConsensus(sources);
            expect(result.getType()).toBe(ValueType.TYPE_BOOLEAN); 
            expect(result.getValue()).toBeDefined();
            expect(result.getValue() === "true" || result.getValue() === "false").toBeTruthy();
            for (let i = 0; i < sources.length - 1 ; i++) {
                expect(sources[i].getSource().isPunished()).toBeFalsy();
            }
        });

        it('should punish all the Directories, test with 6 BooleanSources, no one is working as well', async () => {
            const valueMatrix = [
                [null, true, null, null],
                [true, null, true, null],
                [null, null, null, false],
                [null, null, false, null],
                [null, null, null, null],
                [false, null, true, null],
            ];
            const sources = valueMatrix.map( (inputBooleans, index) => 
                new BoolSourceValues(new MockSourceBool("Source_" + index, index, inputBooleans))
            );

            const result = await runConsensus(sources);
            expect(result.getType()).toBe(ValueType.TYPE_NO_CONSENSUS); 
            for (let i = 0; i < sources.length - 1 ; i++) {
                expect(sources[i].getSource().isPunished()).toBeTruthy();
            }
        });
    });

    describe('String consensus', () => {
        it('should reach consensus with 6 StringSources', async () => {
            const valueMatrix = [
                ["RED", "RED", "RED", "BLACK"],
                ["RED", "YELLOW", "RED", "RED"],
                ["YELLOW", "GREEN", "RED", "GREEN"],
                ["RED", "YELLOW", "GREEN", "GREEN"],
                ["YELLOW", "YELLOW", "BLACK", "..."],
                ["RED", "YELLOW", "BLACK", "BLACK"],
            ];

            const sources = valueMatrix.map((inputString, index) =>
                new StringSourceValues(new MockSourceStr("Source_" + index, index, inputString))
            );

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_STRING);
            expect(result.getValue()).toBeDefined();
            expect(["RED", "YELLOW","GREEN", "BLACK"].includes(result.getValue())).toBeTruthy();
            for (let i = 0; i < sources.length; i++) {
                expect(sources[i].getSource().isPunished()).toBeFalsy();
            }
        });
        
        it('should reach consensus with 6 StringSources and one bad source', async () => {
            const valueMatrix = [
                ["RED", "RED", "RED", "BLACK"],
                ["RED", "YELLOW", "RED", "RED"],
                ["YELLOW", "GREEN", "RED", "GREEN"],
                ["RED", "YELLOW", "GREEN", "GREEN"],
                ["YELLOW", "YELLOW", "BLACK", "..."],
                ["RED", "YELLOW", null, "BLACK"],
            ];

            const sources = valueMatrix.map((inputString, index) =>
                new StringSourceValues(new MockSourceStr("Source_" + index, index, inputString))
            );

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_STRING);
            expect(result.getValue()).toBeDefined();
            expect(["RED", "YELLOW","GREEN", "BLACK"].includes(result.getValue())).toBeTruthy();
            for (let i = 0; i < sources.length - 1 ; i++) {
                expect(sources[i].getSource().isPunished()).toBeFalsy();
            }
            expect(sources[sources.length - 1].getSource().isPunished()).toBeTruthy();
        });

        it('should reach consensus with 6 StringSources and bad sources', async () => {
            const sources = new Array<StringSourceValues>();
            const s1 = new MockSourceStr("Source_0", 0, [null, "A", "B", "C",]);
            const s2 = new MockSourceStr("Source_1", 1, ["A", "A", "B", "C",]);
            const s1_bis = new MockSourceStr("Source_0", 0, ["A", "B", "B", "C",]);
            const s3 = new MockSourceStr("Source_2", 2, ["A", "B", null, "C",]);
            const s1_bis_bis = new MockSourceStr("Source_0", 0, ["A", "B", "B", "Z",]);
            const s4 = new MockSourceStr("Source_3", 3, ["B", "C", "B", "Z"]);
            const s5 = new MockSourceStr("Source_4", 4, ["Z", "X", "T", "K"]);
            const s4_bis = new MockSourceStr("Source_3", 3, ["A", "O", "B", "Z"]);

            sources.push(new StringSourceValues(s1));
            sources.push(new StringSourceValues(s2));
            sources.push(new StringSourceValues(s1_bis));
            sources.push(new StringSourceValues(s3));
            sources.push(new StringSourceValues(s1_bis_bis));
            sources.push(new StringSourceValues(s4));
            sources.push(new StringSourceValues(s5));
            sources.push(new StringSourceValues(s4_bis)); 

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_STRING);
            expect(result.getValue()).toBeDefined();
            expect(s1.isPunished()).toBeTruthy();
            expect(s2.isPunished()).toBeFalsy();
            expect(s1_bis.isPunished()).toBeTruthy();
            expect(s3.isPunished()).toBeTruthy();
            expect(s1_bis_bis.isPunished()).toBeTruthy();
            expect(s4.isPunished()).toBeFalsy();
            expect(s5.isPunished()).toBeFalsy();
            expect(s4_bis.isPunished()).toBeFalsy();
        });
    });

    describe('Number consensus', () => {
        it('should reach a consensus with 6 NumberSources', async () => {
            const valueMatrix = [
                [2.11, 2.20, 2.52, 2.75],
                [2.2, 2.44, 2.44, 2.80],
                [2.4, 2.5, 2.4, 2.4],
                [2.15, 5.0, 2.82, 2.99],
                [2.14, 2.1, 2.3, 2.67],
                [2.5, 2.66, 2.33, 2.71],
            ];

            const sources = valueMatrix.map((inputString, index) =>
                new NumberSourceValues(new MockSourceNumb("Source_" + index, index, inputString))
            );

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_NUMBER);
            expect(result.getValue()).toBeDefined();
            expect(Number(result.getValue()) >= 2.1 && Number(result.getValue()) <= 2.99).toBeTruthy();
        });

        it('should reach a consensus with 6 NumberSources and two bad sources', async () => {
            const valueMatrix = [
                [2.11, 2.20, 2.52, 2.75],
                [2.2, 2.44, 2.44, 2.80],
                [2.4, 2.2, 2.4, 2.4],
                [2.14, 2.1, 2.3, 2.67],
                [2.15, null, 2.82, 2.99],
                [null, 2.66, 2.33, 2.71],
            ];

            const sources = valueMatrix.map((inputString, index) =>
                new NumberSourceValues(new MockSourceNumb("Source_" + index, index, inputString))
            );

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_NUMBER);
            expect(result.getValue()).toBeDefined();
            expect(Number(result.getValue()) >= 2.1 && Number(result.getValue()) <= 2.99).toBeTruthy();

            for (let i = 0; i < sources.length - 2; i++) {
                expect(sources[i].getSource().isPunished()).toBeFalsy();
            }
            expect(sources[sources.length - 2].getSource().isPunished()).toBeTruthy();
            expect(sources[sources.length - 1].getSource().isPunished()).toBeTruthy();

        });

        it('should reach a consensus with 6 NumberSources and punish s1 and s2', async () => {
            const sources = new Array<NumberSourceValues>();
            const s1 = new MockSourceNumb("Source_0", 0, [1.0, 1.0, 1.0, 0.0,]);
            const s2 = new MockSourceNumb("Source_1", 1, [1.0, 2.0, 1.0, 4.0,]);
            const s1_bis = new MockSourceNumb("Source_0", 0, [1.0, 2.0, null, 4.0,]);
            const s3 = new MockSourceNumb("Source_2", 2, [1.0, 10.0, null, 4.0,]);
            sources.push(new NumberSourceValues(s1)); //same source different TD
            sources.push(new NumberSourceValues(s2));
            sources.push(new NumberSourceValues(s1_bis)); //same source different TD
            sources.push(new NumberSourceValues(s3)); 

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_NUMBER);
            expect(result.getValue()).toBeDefined();
            expect(Number(result.getValue()) >= 1 && Number(result.getValue()) <= 4.0).toBeTruthy();

            expect(s1.isPunished()).toBeTruthy()
            expect(s2.isPunished()).toBeFalsy()
            expect(s3.isPunished()).toBeTruthy()
        });
        
        it('should reach a consensus with 6 NumberSources and punish s1 and s2', async () => {
            const sources = new Array<NumberSourceValues>();
            const s1 = new MockSourceNumb("Source_0", 0, [1.1, 2.2, 1.5, 0.9,]);
            const s2 = new MockSourceNumb("Source_1", 1, [1.0, 2.0, 1.0, 4.0,]);
            const s1_bis = new MockSourceNumb("Source_0", 0, [1.8, 1.5, 1.1, 1.7,]);
            const s3 = new MockSourceNumb("Source_2", 2, [1.3, 0.9, 1.1, 1.2,]);
            const s1_bis_bis = new MockSourceNumb("Source_0", 0, [null, 1.5, 1.1, 1.7,]);
            const s4 = new MockSourceNumb("Source_3", 3, [1.2, 1.5, 0.9, 0.9,]);
            const s5 = new MockSourceNumb("Source_4", 4, [1.1, 10.1, 0.1, 4.1,]);
            const s4_bis = new MockSourceNumb("Source_3", 3, [1.2, 1.5, 0.9, 0.9,]);

            sources.push(new NumberSourceValues(s1));
            sources.push(new NumberSourceValues(s2));
            sources.push(new NumberSourceValues(s1_bis));
            sources.push(new NumberSourceValues(s3));
            sources.push(new NumberSourceValues(s1_bis_bis));
            sources.push(new NumberSourceValues(s4));
            sources.push(new NumberSourceValues(s5));
            sources.push(new NumberSourceValues(s4_bis)); 

            const result = await runConsensus(sources);

            expect(result.getType()).toBe(ValueType.TYPE_NUMBER);
            expect(result.getValue()).toBeDefined();
            expect(Number(result.getValue()) >= 0.1 && Number(result.getValue()) <= 10.1).toBeTruthy();

            expect(s1.isPunished()).toBeTruthy();
            expect(s2.isPunished()).toBeFalsy();
            expect(s1_bis.isPunished()).toBeTruthy();
            expect(s3.isPunished()).toBeFalsy();
            expect(s1_bis_bis.isPunished()).toBeTruthy();
            expect(s4.isPunished()).toBeFalsy();
            expect(s5.isPunished()).toBeFalsy();
            expect(s4_bis.isPunished()).toBeFalsy();
        });
    });
});