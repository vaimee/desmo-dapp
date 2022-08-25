"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strValidator = (data) => { return data !== null && data !== undefined && typeof data == "string"; };
const numberValidator = (data) => { return data !== null && data !== undefined && !isNaN(data); };
const boolValidator = (data) => {
    //console.log("------->",typeof data);
    return data !== null && data !== undefined &&
        (typeof data == "boolean" || (typeof data == "string"
            &&
                (data.toLocaleLowerCase().trim() === "true"
                    ||
                        data.toLocaleLowerCase().trim() === "false")));
};
const assertTest = (testName, testFunction, validator = (d) => { return true; }) => {
    return new Promise((resolve, reject) => {
        try {
            testFunction((data) => {
                resolve(validator(data));
            });
        }
        catch (err) {
            console.log(testName + "->Err: ", err);
            resolve(false);
        }
    });
};
exports.default = {
    assertTest,
    strValidator,
    boolValidator,
    numberValidator
};
