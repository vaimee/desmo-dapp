"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Worker_1 = __importDefault(require("../src/component/Worker"));
const Types_1 = __importDefault(require("../src/const/Types"));
const q6 = JSON.stringify({
    "prefixList": {
        "desmo": "https://desmo.vaimee.it/",
        "qudt": "http://qudt.org/schema/qudt/"
    },
    "property": {
        "identifier": "desmo:OutdoorTemperature",
        "unit": "qudt:DEG_C",
        "datatype": 1
    },
    "staticFilter": "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]",
    "dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'",
    "geoFilter": {
        "region": {
            "center": {
                "latitude": 41.9109,
                "longitude": 12.4818
            },
            "radius": {
                "value": 50.0,
                "unit": "qudt:KiloM"
            }
        },
        "altitudeRange": {
            "min": 0,
            "max": 500,
            "unit": "qudt:M"
        }
    },
    "timeFilter": {
        "until": "2022-12-31T23:59:59Z",
        "interval": "PT10M",
        "aggregation": "desmo:Average"
    }
});
const query = JSON.stringify({
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
    "staticFilter": "$[?(@['type']=='Sensor')]",
    //"dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'",
    // "geoFilter": {
    //   "region": {
    //     "center": {
    //       "latitude": 41.9109,
    //       "longitude": 12.4818
    //     },
    //     "radius": {
    //       "value": 50.0,
    //       "unit": "qudt:KiloM"
    //     }
    //   },
    //   "altitudeRange": {
    //     "min": 0,
    //     "max": 500,
    //     "unit": "qudt:M"
    //   }
    // },
    // "timeFilter": {
    //   "until": "2022-12-31T23:59:59Z",
    //   "interval": "PT10M",
    //   "aggregation": "desmo:Average"
    // }
});
const query2 = JSON.stringify({
    "prefixList": [
        { "abbreviation": "desmo", "completeURI": "https://desmo.vaimee.it/" },
        { "abbreviation": "qudt", "completeURI": "http://qudt.org/schema/qudt/" },
        { "abbreviation": "xsd", "completeURI": "http://www.w3.org/2001/XMLSchema/" },
        { "abbreviation": "monas", "completeURI": "https://pod.dasibreaker.vaimee.it/monas/" },
    ],
    "property": {
        "identifier": "temp",
        "unit": "qudt:DEG_C",
        "datatype": 3
    },
    "staticFilter": "$[?(@['type']=='bme')]"
});
// const _test_01 =function(cb:(ris:any) => void):void{
//     const worker = new Worker("./mount/iexec_out/");
//     worker.setCB(cb);
//     worker.work(query,Types.INTERNAL_TEST_REQUEST_ID);   
// }
// const test_01 =async ()=>{
//   return new Promise((resolve, reject) => {
//       try{
//         _test_01((data:any) => {
//               resolve(data!==null);
//         });
//       }catch(err){
//           console.log("UseCase->Err: ",err);
//           resolve(false);
//       }
//   })
// }
const _test_02 = async function (cb) {
    const worker = new Worker_1.default("./mount/iexec_out/");
    worker.setCB(cb);
    await worker.work(query, Types_1.default.INTERNAL_TEST_REQUEST_ID_ZION);
};
const test_02 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_02((data) => {
                resolve(data !== null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(false);
        }
    });
};
const _test_02B = async function (cb) {
    const worker = new Worker_1.default("./mount/iexec_out/");
    worker.setCB(cb);
    await worker.work(query2, Types_1.default.INTERNAL_TEST_REQUEST_ID_ZION);
};
const test_02B = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_02B((data) => {
                resolve(data !== null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(false);
        }
    });
};
const _test_03 = async function (cb) {
    const worker = new Worker_1.default("./mount/iexec_out/");
    worker.setCB(cb);
    await worker.work(query, Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_1);
};
const test_03 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_03((data) => {
                resolve(data === null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(false);
        }
    });
};
const _test_04 = async function (cb) {
    const worker = new Worker_1.default("./mount/iexec_out/");
    worker.setCB(cb);
    await worker.work(query, Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_2);
};
const test_04 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_04((data) => {
                resolve(data === null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(false);
        }
    });
};
const _test_05 = async function (cb) {
    const worker = new Worker_1.default("./mount/iexec_out/");
    worker.setCB(cb);
    await worker.work(query, Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_3);
};
const test_05 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_05((data) => {
                resolve(data === null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(false);
        }
    });
};
const _test_06 = async function (cb) {
    try {
        const worker = new Worker_1.default(undefined);
        worker.setCB(cb);
        await worker.work("", "");
    }
    catch (err) {
        cb(null);
    }
};
const test_06 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_06((data) => {
                resolve(data === null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(true);
        }
    });
};
const _test_07 = async function (cb) {
    try {
        const worker = new Worker_1.default(undefined);
        worker.setCB(cb);
        await worker.work("", Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_3);
    }
    catch (err) {
        cb(null);
    }
};
const test_07 = async () => {
    return new Promise((resolve, reject) => {
        try {
            _test_07((data) => {
                resolve(data === null);
            });
        }
        catch (err) {
            console.log("UseCase-Zion->Err: ", err);
            resolve(true);
        }
    });
};
exports.default = {
    //test_01: test_01, //Linksmart
    test_02: test_02,
    test_02B: test_02B,
    test_03: test_03,
    test_04: test_04,
    test_05: test_05,
    test_06: test_06,
    test_07: test_07,
};
