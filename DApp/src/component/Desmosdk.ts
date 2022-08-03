
import Types from "../const/Types";
import Isdk from "./Isdk";
import {
  DesmoHub,
  WalletSignerInfura,
  // IRequestIDEvent,
  DesmoHubStorage
} from "@vaimee/desmold-sdk"

// const sandboxRoot = './sandbox';
// const samplesRoot = './samples';
const infuraURL = 'https://viviani.iex.ec'; // Replace with your own Infura URL
const privateKEY = '0xd01bb8eb696603a88d7c8fdc54e49ea4c66ac1ebcc6f41a7a910d72f9d8b3840'; // Replace with your own private key
// const MYTDD = 'https://www.desmo.vaimee.it/2019/wot/tdd/v1/TDD:001'; // Replace with your own TDD for tests

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

  async getTDDsByRequestID(requestID: string): Promise<string[]> {
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
      const walletSigner: WalletSignerInfura = new WalletSignerInfura(infuraURL);
      walletSigner.signInWithPrivateKey(privateKEY); //remember to delete if you push to github
  
      const desmohub: DesmoHub = new DesmoHub(walletSigner);
   
      const storage = new DesmoHubStorage(desmohub.provider);
      const map =await storage.getSelectedTDDs([requestID]);
      console.log("map.get(requestID)",map.get(requestID));
      if(map.get(requestID)!==undefined){
        return map.get(requestID)!;
      }else{
        throw Error("Error: not TDDs found!");
      }
    }
    return [];
  }


}




