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



import Logger from "./component/Logger";
import Worker from "./component/Worker";


const logger = Logger.setInstance();
logger.addLog("APP","DApp started!");
process.on('unhandledRejection', error => {
    if(error!==undefined && error!==null){
        if(error instanceof Error){
             logger.addLog("unhandledRejection",error.message,true);
        }else{
            logger.addLog("APP",JSON.stringify(error),true);
        }
    }
}); 

//getting args 
//params: requestID + ' | ' + query,
const _run = async ()=>{
    try{
        // const args =process.argv[2];
        // logger.addLog("APP",args);
        logger.addLog("APP",JSON.stringify(process.argv));
        // const spittedArgs = args.split("|");
        const test_param_0 =process.argv[2].trim();
        logger.addLog("APP.test_param_0",test_param_0,false);
        const test_param_1 =process.argv[3].trim();
        logger.addLog("APP.test_param_1",test_param_1,false);
        const test_param_2 =process.argv[4].trim();
        logger.addLog("APP.test_param_2",test_param_2,false);
    }catch(err){
        logger.addLog("APP",JSON.stringify(err),true);
        if(err instanceof Error){
            logger.addLog("APP",err.toString(),true);
            logger.addLog("APP",err.message,true);
            if(err.stack!==undefined){
                logger.addLog("APP",err.stack,true);
            }
        }
    }
    
}

_run();