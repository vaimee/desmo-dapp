import axios from "axios";
import { promises as fsPromises } from 'fs';
import {ethers} from "ethers-ts";


export default class Worker{

      constructor(){ }

      err(err:string):void{
        console.log("ERROR: "+err);
        process.exit(1);
      }

      work():void{
          (async () => {
            try {
              const iexecOut = process.env.IEXEC_OUT;
              // Do whatever you want (let's write hello world here)
              const url = "http://www.7timer.info/bin/api.pl?lon=44.49&lat=11.34&product=astro&output=xml";
              const message = await axios.get(url);
              var msg = 10; 
              //var callback_data =coder.encodeParameter(['uint256', 'string'], [msgRandom,'CIAO']).hex()
              //var callback_data =coder.encodeParameter('uint256', msgRandom);
              // packed data always bytes32 (bytes32 vs uint256?) WARNING is that the problem?
  
              var callback_data = ethers.utils.defaultAbiCoder.encode(["uint"], [msg]);
              console.log('result: '+msg);
              console.log('result.encode_abi:'+callback_data);

            
              if(message.status===200){
                // Append some results in /iexec_out/
               // await fsPromises.writeFile(`${iexecOut}/result.txt`,callback_data);
               
                // Declare everything is computed
                // const computedJsonObj = {
                //   'deterministic-output-path': `${iexecOut}/result.txt`
                //   // 'callback-data': "0x"+md5(`CIAO`)
                // };
                const computedJsonObj = {
                  //'deterministic-output-path': `${iexecOut}/result.txt`,
                  'callback-data': callback_data
                };
                
                await fsPromises.writeFile(
                  `${iexecOut}/computed.json`,
                  JSON.stringify(computedJsonObj),
                );
                console.log("computedJsonObj",computedJsonObj)
              }else{
                this.err("Get status code "+ message.status+ " from api.");
              }
            } catch (e:any) {
                this.err(e.message);
            }
          })();
      }
}

  
