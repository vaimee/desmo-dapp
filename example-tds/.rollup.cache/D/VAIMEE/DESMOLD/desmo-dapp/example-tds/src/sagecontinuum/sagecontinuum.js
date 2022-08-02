import { __awaiter, __generator } from "tslib";
import bme680 from "./bme680.td.json";
import axios from "axios";
// import readSensorData from "../utils"
var readSensorData = function (sensorName, filterProp) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, query, ris;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    query = {
                        start: "-10s",
                        tail: 1,
                        filter: {
                            sensor: sensorName,
                            name: filterProp
                        }
                    };
                    return [4 /*yield*/, axios.post("https://data.sagecontinuum.org/api/v1/query", query, headers)];
                case 1:
                    ris = _a.sent();
                    return [2 /*return*/, null];
            }
        });
    });
};
var activeSagecontinuum = function () {
    WoT.produce(bme680).then(function (thing) {
        var sensorName = "bme680";
        thing.setPropertyReadHandler("temp", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readSensorData(sensorName, "env.temperature")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        thing.setPropertyReadHandler("humidity", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readSensorData(sensorName, "env.relative_humidity")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        thing.setPropertyReadHandler("in_humidity", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readSensorData(sensorName, "iio.in_humidityrelative_input")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        thing.setPropertyReadHandler("pressure", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readSensorData(sensorName, "iio.in_pressure_input")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        thing.setPropertyReadHandler("resistance", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, readSensorData(sensorName, "iio.in_resistance_input")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.04666098];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, -123.0737003];
            });
        }); });
        thing.expose();
    });
};
export default activeSagecontinuum;
//# sourceMappingURL=sagecontinuum.js.map