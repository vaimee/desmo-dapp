import { promises as fsPromises } from 'fs';
import {ethers} from "ethers-ts";
import TestConsNumb from "./TestConsNumb";
import IWorker from "../component/IWorker";

const runWithPromise=function():Promise<number>{
  return new Promise(function(resolve, reject){
        TestConsNumb.test_03(resolve);
    })
}

function getPrecision(a:number):number {
  if (!isFinite(a)) return 0;
  var e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}

export default class WorkerTest implements IWorker{

      constructor(){ }

      err(err:string):void{
        console.log("ERROR: "+err);
        process.exit(1);
      }

      work():void{
          (async () => {
            try {
                const iexecOut = process.env.IEXEC_OUT;
        
                const real_value=await runWithPromise();
                const precision=getPrecision(real_value);
                const intvalue=Math.trunc(real_value*precision);
                var callback_data = ethers.utils.defaultAbiCoder.encode(["uint","uint256","uint"], [intvalue,precision,intvalue]);
               
                const computedJsonObj = {
                  'callback-data': callback_data
                };
                
                console.log('real_value: '+real_value);   
                console.log('intvalue: '+intvalue);     
                console.log('precision: '+precision);       
                console.log("computedJsonObj",computedJsonObj)

                await fsPromises.writeFile(
                  `${iexecOut}/computed.json`,
                  JSON.stringify(computedJsonObj),
                );
           
            } catch (e:any) {
                this.err(e.message);
            }
          })();
      }
}

  


