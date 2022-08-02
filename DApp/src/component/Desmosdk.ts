
import Types from "../const/Types";
import Isdk from "./Isdk";
import desmold_sdk from "@vaimee/desmold-sdk"
const LinkSmartDires =[ "http://localhost:8081",
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

const ZionDirs =[
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
   "http://localhost:3000",
];

export default class Desmosdk implements Isdk {

  getTDDsByRequestID(requestID: string): string[] {
    if(requestID===Types.INTERNAL_TEST_REQUEST_ID){
      return LinkSmartDires;
    }else if(requestID===Types.INTERNAL_TEST_REQUEST_ID_ZION){
      return ZionDirs;
    }else if(requestID===Types.INTERNAL_TEST_REQUEST_ID_REJECT_1){
      const temp = ZionDirs;
      temp.push("http://localhost:3000");
      temp.push("http://localhost:3000");
      return temp;
    }else if(requestID===Types.INTERNAL_TEST_REQUEST_ID_REJECT_2){
      return ["http://localhost:3000","http://localhost:3000"];
    }else if(requestID===Types.INTERNAL_TEST_REQUEST_ID_REJECT_3){
      const temp = ["http://localhost:3000"];
      for(let x=0;x<259;x++){
        temp.push("http://localhost:3000");
      }
      return temp;
    }else{
      throw new Error("NOT IMPLEMENTED YET");
    }
    return [];
  }


}




