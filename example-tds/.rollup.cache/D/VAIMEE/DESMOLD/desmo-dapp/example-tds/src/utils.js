import { __awaiter, __generator } from "tslib";
import axios from "axios";
var readSensorData = function (sensorName, filterProp) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, query, ris, jsonArr, temp, x;
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
                    console.log("readSensorData.ris", ris);
                    jsonArr = [];
                    try {
                        jsonArr = JSON.parse(ris.data);
                    }
                    catch (e) {
                        temp = ris.data.toString().split("\n");
                        for (x in temp) {
                            try {
                                jsonArr.push(JSON.parse(temp[x]));
                            }
                            catch (ignore) {
                            }
                        }
                    }
                    console.log("readSensorData.jsonArr", jsonArr);
                    return [2 /*return*/, jsonArr[jsonArr.length - 1].value];
            }
        });
    });
};
export default readSensorData;
//# sourceMappingURL=utils.js.map