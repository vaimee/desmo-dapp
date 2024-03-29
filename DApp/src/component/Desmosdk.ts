
import Types from "../const/Const";
import Isdk from "./Isdk";
import {ethers} from "ethers-ts";
import {
  Desmo,
  WalletSignerJsonRpc,
} from "@vaimee/desmold-sdk"

const componentName = "DesmoSDKWrapper";
// const sandboxRoot = './sandbox';
// const samplesRoot = './samples';
const infuraURL = 'https://bellecour.iex.ec'; // Replace with your own Infura URL
const privateKEY = '0x7fa112228c073e16e5f2cca93af326281c19466c6cf29281c8095550407187e5'; // Replace with your own private key
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

const ZionOnlineDirs =[
  "https://desmold-zion-1.vaimee.it",
  "https://desmold-zion-2.vaimee.it",
  "https://desmold-zion-3.vaimee.it",
  "https://desmold-zion-4.vaimee.it"
];


export default class Desmosdk implements Isdk {

  async getTDDsByRequestID(requestID: string): Promise<string[]> {

    console.log(componentName, "Resolve requestID to retrieve TDDs. RequestiD: " + requestID);
    //return ZionOnlineDirs;

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
      try{

        const walletSigner: WalletSignerJsonRpc = new WalletSignerJsonRpc(infuraURL);
        walletSigner.signInWithPrivateKey(privateKEY); //remember to delete if you push to github
    
        const desmoContract: Desmo = new Desmo(walletSigner);
        const bites = ethers.utils.arrayify(requestID);
        // console.log("DEBUG: bites",bites);
        const map =await desmoContract.getTDDByRequestID(bites);
        const sanityzzeMap =new Array<string>();
        for(var x=0;x<map.length;x++){
          if(map[x].endsWith("/")){
            sanityzzeMap.push(map[x].substring(0,map[x].length-1));
          }else{
            sanityzzeMap.push(map[x]);
          }
        }
        
        console.log(componentName, "DEBUG: sanityzzeMap: "+JSON.stringify(sanityzzeMap));
        
        return sanityzzeMap;
      }catch(err){
        console.log(componentName, "error on using the SDK: "+err,true);
        return [];
      }

    }
    // return [];
  }


}




