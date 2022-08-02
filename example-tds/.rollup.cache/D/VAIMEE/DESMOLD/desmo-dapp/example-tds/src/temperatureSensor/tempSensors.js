import { __awaiter, __generator } from "tslib";
import td_temp_01 from "./temp_01.td.json";
import td_temp_02 from "./temp_02.td.json";
import td_temp_03 from "./temp_03.td.json";
var maxValueT_01 = 100;
var maxValueT_02 = 100;
var maxValueT_03 = 200;
var activeTemperatureSensors = function () {
    WoT.produce(td_temp_01).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Math.trunc(Math.random() * maxValueT_01 * 100) / 100];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494888];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426163];
            });
        }); });
        thing.expose();
    });
    WoT.produce(td_temp_02).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Math.trunc(Math.random() * maxValueT_02 * 100) / 100];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494889];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426165];
            });
        }); });
        thing.expose();
    });
    WoT.produce(td_temp_03).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Math.trunc(Math.random() * maxValueT_03 * 100) / 100];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494884];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426162];
            });
        }); });
        thing.expose();
    });
};
export default activeTemperatureSensors;
//# sourceMappingURL=tempSensors.js.map