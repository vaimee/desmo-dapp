import Logger from "./component/Logger";
import Worker from "./component/Worker";
import Conf from "./const/Config";
import QueryParser from "./component/QueryParser";
import fs from "fs";
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

const _run = async ()=>{
    // console.log("process.env",process.env);
    let iexecOut= process.env.IEXEC_OUT;
    if (iexecOut === undefined || iexecOut.trim().length===0) {
        iexecOut = Conf.DEFAULT_IEXEC_OUT;
    }
    try{
        if(Number(process.env.IEXEC_INPUT_FILES_NUMBER)>0 && process.env.IEXEC_IN!==undefined){
            const path = process.env.IEXEC_IN +"/"+ process.env.IEXEC_INPUT_FILE_NAME_1;
            const data = fs.readFileSync(path,"utf8");
            logger.addLog("APP","File["+path+"] readed:"+ data);
            const requestID =JSON.parse(data).requestID;
            const query =JSON.parse(data).query;
            const worker = new Worker(iexecOut);
            await worker.work(JSON.stringify(query),requestID);
        }else{
            logger.addLog("APP",JSON.stringify(process.argv));
            const requestID =process.argv[2].trim();
            const worker = new Worker(iexecOut);
            await worker.work(QueryParser.convertFromArgs(process.argv),requestID);
        }

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