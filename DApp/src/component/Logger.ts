import axios from "axios";
import Config from "../const/Config";
class Logger {

    id:string;
    log=new Array<string>();
    requestID:string="NOT SETTED REQEUSTID";
    private static instance:Logger;

    static getInstance():Logger{
        if(Logger.instance===undefined){
            return Logger.setInstance();
        }
        return Logger.instance;
    }
    
    static setInstance():Logger{
        Logger.instance = new Logger();
        return Logger.instance;
    }

    private constructor() {
        this.id = new Date().toString();
        this.log.push("##################################################");
        this.log.push("DApp init log at: " + this.id);
        this.log.push("##################################################");
    }

    setRequestID(requestID:string){
        this.requestID=requestID;
    }
    
    addLog(componentName:string,msg:string,err:boolean=false){
        var _log="";
        if(err){
            _log="["+new Date().toString()+"]["+componentName+"] !ERROR!: "+msg;
        }else{
            _log="["+new Date().toString()+"]["+componentName+"]: "+ msg;
        }
        this.log.push(_log);
        console.log(_log);
        this.sendLog(_log);
    }

    sendLog(actualLog:string){

       

        var headers = { 'Content-Type': 'application/json' };
        axios.post(
            Config.LOGGER_URL,
            {
                id:this.id,
                requestID:this.requestID,
                log:actualLog,
                partial:true
            },
            {headers:headers}
        );
        
    }


    sendLogs(cb:()=>void|undefined){

        const callAfter = ()=>{
            if(cb!==undefined){
                cb();
            }
        };

        var headers = { 'Content-Type': 'application/json' };
        axios.post(
            Config.LOGGER_URL,
            {
                id:this.id,
                requestID:this.requestID,
                logs:this.log,
                partial:false
            },
            {headers:headers}
        )
        .then(callAfter)
        .catch(callAfter);
        
    }

}

export default Logger;