import { __awaiter, __generator } from "tslib";
import readSensorData from "./utils";
var t = function () { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = console).log;
            return [4 /*yield*/, readSensorData("bme680", "env.temperature")];
        case 1:
            _b.apply(_a, [_c.sent()]);
            return [2 /*return*/];
    }
}); }); };
t();
//# sourceMappingURL=temp.js.map