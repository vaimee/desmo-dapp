import { promises as fsPromises } from 'fs';
import { ethers } from "ethers-ts";
import TestConsNumb from "./TestConsNumb";
import { IExecResult, IWorker } from "../src/component/IWorker";


function getPrecision(a: number): number {
  if (!isFinite(a)) return 0;
  var e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}

export default class WorkerTest implements IWorker {

  constructor() { }

  err(err: string): void {
    throw new Error("ERROR: " + err);
  }

  async work(): Promise<IExecResult> {
    const iexecOut = process.env.IEXEC_OUT;

    const real_value = await TestConsNumb.test_03();
    if (real_value === null) {
      this.err("NULL value find!");
    }
    const precision = getPrecision(real_value);
    const intvalue = Math.trunc(real_value * precision);
    var callback_data = ethers.utils.defaultAbiCoder.encode(["uint", "uint256", "uint"], [intvalue, precision, intvalue]);

    const computedJsonObj = {
      'callback-data': callback_data
    };

    console.log('real_value: ' + real_value);
    console.log('intvalue: ' + intvalue);
    console.log('precision: ' + precision);
    console.log("computedJsonObj", computedJsonObj)

    await fsPromises.writeFile(
      `${iexecOut}/computed.json`,
      JSON.stringify(computedJsonObj),
    );
    return computedJsonObj;
  }
}




