//////#######################TEST 1
// import WorkerTest from "./component/WorkerTest";
// const worker = new WorkerTest();
// worker.work();

//////#######################TEST 2
//import WorkerSimpleTest from "./component/WorkerSimpleTest";
// const worker = new WorkerSimpleTest();
// worker.work();

//////#######################REAL CASE
import Worker from "./component/Worker";


//-----------------------------THIS WILL REWORKED (request ID)
//getting args
const query = process.argv[2];
const directoriesList = new Array<number>();
var x = 3;
var nextArg = process.argv[x];

while (nextArg !== undefined) {
    directoriesList.push(Number(nextArg));
    x++;
    nextArg = process.argv[x];
}

const worker = new Worker(undefined);
worker.work(query,directoriesList);

//################## JUST FOR TEST
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
