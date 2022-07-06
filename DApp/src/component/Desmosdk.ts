import Directories from "../const/Directories";
import Types from "../const/Types";
import Isdk from "./Isdk";

export default class Desmosdk implements Isdk {

  getTDDsByRequestID(requestID: string): string[] {
    if(requestID===Types.INTERNAL_TEST_REQUEST_ID){
      return Directories;
    }
    return [];
  }


}




