"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = __importDefault(require("../const/Types"));
const ethers_ts_1 = require("ethers-ts");
const desmold_sdk_1 = require("@vaimee/desmold-sdk");
const Logger_1 = __importDefault(require("./Logger"));
const componentName = "DesmoSDKWrapper";
// const sandboxRoot = './sandbox';
// const samplesRoot = './samples';
const infuraURL = 'https://viviani.iex.ec'; // Replace with your own Infura URL
const privateKEY = '0xd01bb8eb696603a88d7c8fdc54e49ea4c66ac1ebcc6f41a7a910d72f9d8b3840'; // Replace with your own private key
// const MYTDD = 'https://www.desmo.vaimee.it/2019/wot/tdd/v1/TDD:001'; // Replace with your own TDD for tests
const LinkSmartDires = ["http://localhost:8081",
    "http://localhost:8082",
    "http://localhost:8083",
    "http://localhost:8084",
    "http://localhost:8085",
    "http://localhost:8086",
    "http://localhost:8087",
    "http://localhost:8088",
    "http://localhost:8089",
    "http://localhost:8090"
];
const ZionDirs = [
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
    "http://localhost:3000",
];
const ZionOnlineDirs = [
    "https://desmold-zion-1.vaimee.it",
    "https://desmold-zion-2.vaimee.it",
    "https://desmold-zion-3.vaimee.it",
    "https://desmold-zion-4.vaimee.it"
];
class Desmosdk {
    async getTDDsByRequestID(requestID) {
        Logger_1.default.getInstance().addLog(componentName, "Resolve requestID to retrieve TDDs. RequestiD: " + requestID);
        //return ZionOnlineDirs;
        if (requestID === Types_1.default.INTERNAL_TEST_REQUEST_ID) {
            return LinkSmartDires;
        }
        else if (requestID === Types_1.default.INTERNAL_TEST_REQUEST_ID_ZION) {
            return ZionDirs;
        }
        else if (requestID === Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_1) {
            const temp = ZionDirs;
            temp.push("http://localhost:3000");
            temp.push("http://localhost:3000");
            return temp;
        }
        else if (requestID === Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_2) {
            return ["http://localhost:3000", "http://localhost:3000"];
        }
        else if (requestID === Types_1.default.INTERNAL_TEST_REQUEST_ID_REJECT_3) {
            const temp = ["http://localhost:3000"];
            for (let x = 0; x < 259; x++) {
                temp.push("http://localhost:3000");
            }
            return temp;
        }
        else {
            try {
                const walletSigner = new desmold_sdk_1.WalletSignerJsonRpc(infuraURL);
                walletSigner.signInWithPrivateKey(privateKEY); //remember to delete if you push to github
                const desmohub = new desmold_sdk_1.DesmoHub(walletSigner);
                const bites = ethers_ts_1.ethers.utils.arrayify(requestID);
                // console.log("DEBUG: bites",bites);
                const map = await desmohub.getTDDByRequestID(bites);
                const sanityzzeMap = new Array();
                for (var x = 0; x < map.length; x++) {
                    if (map[x].endsWith("/")) {
                        sanityzzeMap.push(map[x].substring(0, map[x].length - 1));
                    }
                    else {
                        sanityzzeMap.push(map[x]);
                    }
                }
                Logger_1.default.getInstance().addLog(componentName, "DEBUG: sanityzzeMap: " + JSON.stringify(sanityzzeMap));
                return sanityzzeMap;
            }
            catch (err) {
                Logger_1.default.getInstance().addLog(componentName, "error on using the SDK: " + err, true);
                return [];
            }
        }
        // return [];
    }
}
exports.default = Desmosdk;
