//////#######################TEST 1
// import WorkerTest from "./component/WorkerTest";
// const worker = new WorkerTest();
// worker.work();

//////#######################TEST 2
//import WorkerSimpleTest from "./component/WorkerSimpleTest";
// const worker = new WorkerSimpleTest();
// worker.work();

//################## CHAIN TEST 

// import { promises as fsPromises } from 'fs';
// import {ethers} from "ethers-ts";
// var ris = JSON.stringify(Object.keys(process.env)) + "\n" + JSON.stringify(Object.keys(process.argv));
// const computedJsonObj = {
//     'callback-data': ethers.utils.defaultAbiCoder.encode(["string"], [ris])
// };
// fsPromises.writeFile(
// `${process.env.IEXEC_OUT}/computed.json`,
// JSON.stringify(computedJsonObj),
// );




import WorkerMock from "./component/WorkerMock";

//getting args
const requestID = process.argv[2];
const worker = new WorkerMock(undefined);
worker.work(requestID,"");