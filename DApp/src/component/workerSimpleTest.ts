import { promises as fsPromises } from 'fs';
import {ethers} from "ethers-ts";

export default class WorkerSimpleTest{

      constructor(){ }

      err(err:string):void{
        console.log("ERROR: "+err);
        process.exit(1);
      }

      work():void{
          (async () => {
            try {
                const iexecOut = process.env.IEXEC_OUT;
                var callback_data = ethers.utils.defaultAbiCoder.encode(["uint"], [10]);
                const computedJsonObj = {
                  'callback-data': callback_data
                };
                console.log("callback-data: ",computedJsonObj);
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

  


