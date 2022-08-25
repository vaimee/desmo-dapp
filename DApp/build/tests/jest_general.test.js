"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VoidSource_1 = __importDefault(require("../src/model/VoidSource"));
const TestUtils_1 = __importDefault(require("./TestUtils"));
const Result_1 = __importDefault(require("../src/model/Result"));
const Source_1 = __importDefault(require("../src/model/Source"));
const Types_1 = __importDefault(require("../src/const/Types"));
const EncoderMix_1 = __importDefault(require("../src/component/encoder/EncoderMix"));
const DirectoriesCollector_1 = __importDefault(require("../src/component/DirectoriesCollector"));
const QueryParser_1 = __importDefault(require("../src/component/QueryParser"));
const StringSourceValues_1 = __importDefault(require("../src/model/StringSourceValues"));
const MockSourceStr_1 = __importDefault(require("./MockSourceStr"));
const simmple_query = JSON.stringify({
    "prefixList": [
        { "abbreviation": "desmo", "completeURI": "https://desmo.vaimee.it/" },
        { "abbreviation": "qudt", "completeURI": "http://qudt.org/schema/qudt/" },
        { "abbreviation": "xsd", "completeURI": "http://www.w3.org/2001/XMLSchema/" },
        { "abbreviation": "monas", "completeURI": "https://pod.dasibreaker.vaimee.it/monas/" },
    ],
    "property": {
        "identifier": "value",
        "unit": "qudt:DEG_C",
        "datatype": 3
    },
    "staticFilter": "$[?(@['@type']=='ControlUnit')]",
});
test('StringSourceValues.test01', async () => {
    const s1 = new MockSourceStr_1.default("Source_0", 0, [null, "A", "B", "C",]);
    const ssv = new StringSourceValues_1.default(s1);
    const str = "NO NEED PARSING";
    expect(ssv.parse(str)).toEqual(str);
});
test('DirectoriesCollector.test01', async () => {
    const dc = new DirectoriesCollector_1.default();
    await dc.init();
    const parser = new QueryParser_1.default(simmple_query);
    const promised = function (_parser) {
        return new Promise((resolve, reject) => {
            try {
                dc.collectDirs(["http://localhost:3000"], _parser, resolve);
            }
            catch (err) {
                reject(false);
            }
        });
    };
    const sources = await promised(parser);
    console.log("DirectoriesCollector.test01", sources);
    const keys = sources.keys();
    var ok = true;
    for (let key of keys) {
        const arrS = sources.get(key);
        if (arrS !== undefined) {
            for (let x = 0; x < arrS.length; x++) {
                arrS[x].punish();
                console.log("DirectoriesCollector.test01.arrS[x].isPunished()", arrS[x].isPunished());
                if (!arrS[x].isPunished()) {
                    ok = false;
                }
            }
        }
    }
    expect(ok).toEqual(true);
});
test('DirectoriesCollector.test02', async () => {
    const dc = new DirectoriesCollector_1.default();
    await dc.init();
    const parser = new QueryParser_1.default(simmple_query);
    const promised = function (_parser) {
        return new Promise((resolve, reject) => {
            try {
                dc.resolveToISourceArr([], parser, 0, resolve);
            }
            catch (err) {
                reject(false);
            }
        });
    };
    const sources = await promised(parser);
    expect(sources.length).toEqual(1);
    expect(sources[0] instanceof VoidSource_1.default).toEqual(true);
});
test('DirectoriesCollector.test03', async () => {
    const dc = new DirectoriesCollector_1.default();
    await dc.init();
    const parser = new QueryParser_1.default(simmple_query);
    const promised = function (_parser) {
        return new Promise((resolve, reject) => {
            try {
                dc.collectDirs(["http://localhost:3000"], _parser, resolve);
            }
            catch (err) {
                reject(false);
            }
        });
    };
    const sources = await promised(parser);
    console.log("DirectoriesCollector.test01", sources);
    const keys = sources.keys();
    var ok = true;
    for (let key of keys) {
        const arrS = sources.get(key);
        if (arrS !== undefined) {
            for (let x = 0; x < arrS.length; x++) {
                arrS[x].punish();
                console.log("DirectoriesCollector.test01.arrS[x].isPunished()", arrS[x].isPunished());
                if (!arrS[x].isPunished()) {
                    ok = false;
                }
            }
        }
    }
    expect(ok).toEqual(true);
});
test('DirectoriesCollector.test04', async () => {
    const dc = new DirectoriesCollector_1.default();
    var ok = true;
    try {
        ok = (await dc.resolveTD({}) === null);
    }
    catch (err) {
        ok = false;
    }
    expect(ok).toEqual(true);
});
test('DirectoriesCollector.test05', async () => {
    const dc = new DirectoriesCollector_1.default();
    await dc.init();
    var ok = true;
    try {
        ok = (await dc.resolveTD(null) === null);
    }
    catch (err) {
        ok = false;
    }
    expect(ok).toEqual(true);
});
test('DirectoriesCollector.test06', async () => {
    const dc = new DirectoriesCollector_1.default();
    const parser = new QueryParser_1.default(simmple_query);
    await dc.init();
    const promised = function () {
        return new Promise((resolve, reject) => {
            try {
                dc.getThingFromDir("null", 0, parser, resolve);
            }
            catch (err) {
                reject(false);
            }
        });
    };
    const sources = await promised();
    expect(sources.length).toEqual(1);
    expect(sources[0] instanceof VoidSource_1.default).toEqual(true);
});
test('VoidSource.test01', async () => {
    const vs = new VoidSource_1.default("http://localhost:3000", 1);
    expect(vs.getIndex()).toEqual(1);
    expect(vs.getScore()).toEqual(0);
    vs.setScore(3);
    expect(vs.getScore()).toEqual(0);
    expect(vs.isPunished()).toEqual(true);
    vs.punish();
    expect(vs.getScore()).toEqual(0);
    expect(vs.isPunished()).toEqual(true);
    var err = false;
    try {
        await vs.ask();
    }
    catch (e) {
        err = true;
    }
    expect(err).toEqual(true);
});
test('TestUtils.test01', async () => {
    expect(await TestUtils_1.default.assertTest("test", () => { throw Error("test error"); })).toEqual(false);
    expect(await TestUtils_1.default.assertTest("test", (cb) => { cb(); })).toEqual(true);
    expect(await TestUtils_1.default.assertTest("test", (cb) => { cb(null); }, (r) => { return r !== null; })).toEqual(false);
    expect(await TestUtils_1.default.assertTest("test", (cb) => { cb(null); }, (r) => { return r === null; })).toEqual(true);
});
test('Result.test01', async () => {
    const ris = new Result_1.default("22222.65", Types_1.default.TYPE_NUMBER, []);
    const encoded = ris.getEncodedValue(new EncoderMix_1.default());
    console.log("encoded:", encoded);
    expect(encoded.length > 0).toEqual(true);
});
test('Result.test02', async () => {
    const ris = new Result_1.default("true", Types_1.default.TYPE_BOOLEAN, []);
    const encoder = new EncoderMix_1.default();
    const encoded = ris.getEncodedValue(encoder);
    console.log("encoded:", encoded);
    expect(encoder.decode(encoded).value[0]).toEqual("true");
});
test('Result.test03', async () => {
    const ris1 = new Result_1.default("true", Types_1.default.TYPE_BOOLEAN, []);
    expect(ris1.getType()).toEqual(Types_1.default.TYPE_BOOLEAN);
    const ris2 = new Result_1.default("true", Types_1.default.TYPE_STRING, []);
    expect(ris2.getType()).toEqual(Types_1.default.TYPE_STRING);
    const ris3 = new Result_1.default("true", Types_1.default.TYPE_NUMBER, []);
    expect(ris3.getType()).toEqual(Types_1.default.TYPE_NUMBER);
});
test('Source.test01', async () => {
    const source = new Source_1.default("http://localhost:3000", 1);
    const value = source.ask();
    expect(value !== undefined && value !== null).toEqual(true);
});
