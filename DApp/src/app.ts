import Worker from "./component/Worker";
import Conf from "./const/Config";
import QueryParser from "./component/QueryParser";
import fs from "fs";
import { IExecResult } from "./component/IWorker";
console.log("APP: STARTING");

const _run = async ()=>{
    let result: IExecResult = {
        "callback-data": ""
    }

    try{
        let iexecOut = process.env.IEXEC_OUT;
        if (iexecOut === undefined || iexecOut.trim().length === 0) {
            iexecOut = Conf.DEFAULT_IEXEC_OUT;
        }

        if(Number(process.env.IEXEC_INPUT_FILES_NUMBER)>0 && process.env.IEXEC_IN!==undefined){
            const path = process.env.IEXEC_IN +"/"+ process.env.IEXEC_INPUT_FILE_NAME_1;
            const data = fs.readFileSync(path,"utf8");
            console.log("APP","File["+path+"] readed:"+ data);
            const requestID =JSON.parse(data).requestID;
            const query =JSON.parse(data).query;
            const worker = new Worker(iexecOut);
            result = await worker.work(JSON.stringify(query),requestID);
        }else{
            console.log("APP",JSON.stringify(process.argv));
            const requestID =process.argv[2].trim();
            const worker = new Worker(iexecOut);
            result = await worker.work(QueryParser.convertFromArgs(process.argv),requestID);
        }

    }catch(err){
        console.log("APP:", JSON.stringify(err))
        if(err instanceof Error){
            console.log("APP",err.toString(),true);
            console.log("APP",err.message,true);
            if(err.stack!==undefined){
                console.log("APP",err.stack,true);
            }
        }
    }
    
    // IExec requires to always write a computed.json file
    // even if the result is empty
    fs.writeFileSync(
        `${process.env.IEXEC_OUT}/computed.json`,
        JSON.stringify(result),
    );
    console.log("APP: result written to computed.json");
    console.log("APP: ENDING");

    if(result["callback-data"].trim().length === 0){
        process.exit(1);
    }
}

_run();