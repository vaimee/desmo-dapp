//////#######################TEST 1
// import WorkerTest from "./component/workerTest";
// const worker = new WorkerTest();
// worker.work();

//////#######################TEST 2
//import WorkerSimpleTest from "./component/workerSimpleTest";
// const worker = new WorkerSimpleTest();
// worker.work();

//////#######################REAL CASE
import Worker from "./component/worker";
//getting args
const query = process.argv[2];
const directoryesList = new Array<number>();
var x = 3;
var nextArg = process.argv[x];

while (nextArg !== undefined) {
    directoryesList.push(Number(nextArg));
    x++;
    nextArg = process.argv[x];
}

const worker = new Worker();

worker.work(query,directoryesList);

