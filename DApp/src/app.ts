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

const worker = new Worker();

worker.work(query,directoriesList);

