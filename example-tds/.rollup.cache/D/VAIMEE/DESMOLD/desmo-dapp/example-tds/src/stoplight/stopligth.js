import { __awaiter, __generator } from "tslib";
import stopligth_01 from "./stopligth_01.td.json";
import stopligth_02 from "./stopligth_02.td.json";
import stopligth_03 from "./stopligth_03.td.json";
function getColor(offset) {
    if (offset === void 0) { offset = 0; }
    var temp = new Date().getMinutes().toString();
    var temp2 = Number(temp[temp.length - 1]) + offset;
    if (temp2 > 9) {
        temp2 = 0;
    }
    if ((temp2 > 2 && temp2 < 4) || (temp2 > 6 && temp2 < 8)) {
        return "GREEN";
    }
    else if ((temp2 > 4 && temp2 < 5) || temp2 > 9) {
        return "YELLOW";
    }
    else {
        return "RED";
    }
}
var activeStopligths = function () {
    WoT.produce(stopligth_01).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getColor()];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494855];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426133];
            });
        }); });
        thing.expose();
    });
    WoT.produce(stopligth_02).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getColor(1)];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494856];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426144];
            });
        }); });
        thing.expose();
    });
    WoT.produce(stopligth_03).then(function (thing) {
        thing.setPropertyReadHandler("value", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, getColor(2)];
            });
        }); });
        thing.setPropertyReadHandler("latitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 44.494857];
            });
        }); });
        thing.setPropertyReadHandler("longitude", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 11.3426143];
            });
        }); });
        thing.expose();
    });
};
export default activeStopligths;
//# sourceMappingURL=stopligth.js.map