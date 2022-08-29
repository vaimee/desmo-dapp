import Worker from "../src/component/Worker";
import Types from "../src/const/Types";

const query: string = JSON.stringify({
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"xsd", "completeURI":"http://www.w3.org/2001/XMLSchema/"},
    {"abbreviation":"monas", "completeURI":"https://pod.dasibreaker.vaimee.it/monas/"},
  ],
  "property": {
    "identifier": "value",
    "unit": "qudt:DEG_C",                     //skip
    "datatype": 3
  },
  "staticFilter": "$[?(@['type']=='Sensor')]",
});

const query2: string = JSON.stringify({
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"xsd", "completeURI":"http://www.w3.org/2001/XMLSchema/"},
    {"abbreviation":"monas", "completeURI":"https://pod.dasibreaker.vaimee.it/monas/"},
  ],
  "property": {
    "identifier": "temp",
    "unit": "qudt:DEG_C",                     //skip
    "datatype": 3
  },
  "staticFilter": "$[?(@['type']=='bme')]"
});


const _test_02 =async function(cb:(ris:any) => void){
  const worker = new Worker("./mount/iexec_out/");
  worker.setCB(cb);
  await worker.work(query,Types.INTERNAL_TEST_REQUEST_ID_ZION);   
}
const test_02 =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_02((data:any) => {
              resolve(data!==null);
        });
      }catch(err){
          console.log("UseCase-Zion->Err: ",err);
          resolve(false);
      }
  })
}

const _test_02B =async function(cb:(ris:any) => void){
  const worker = new Worker("./mount/iexec_out/");
  worker.setCB(cb);
  await worker.work(query2,Types.INTERNAL_TEST_REQUEST_ID_ZION);   
}
const test_02B =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_02B((data:any) => {
              resolve(data!==null);
        });
      }catch(err){
          console.log("UseCase-Zion->Err: ",err);
          resolve(false);
      }
  })
}


const _test_03 =async function(cb:(ris:any) => void){
  const worker = new Worker("./mount/iexec_out/");
  worker.setCB(cb);
 await worker.work(query,Types.INTERNAL_TEST_REQUEST_ID_REJECT_1);   
}
const test_03 =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_03((data:any) => {
              resolve(data===null);
        });
      }catch(err){
          console.log("UseCase-Zion->Err: ",err);
          resolve(false);
      }
  })
}

const _test_04 =async  function(cb:(ris:any) => void){
  const worker = new Worker("./mount/iexec_out/");
  worker.setCB(cb);
  await worker.work(query,Types.INTERNAL_TEST_REQUEST_ID_REJECT_2);   
}
const test_04 =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_04((data:any) => {
              resolve(data===null);
        });
      }catch(err){
          console.log("UseCase-Zion->Err: ",err);
          resolve(false);
      }
  })
}

const _test_05 =async function(cb:(ris:any) => void){
  const worker = new Worker("./mount/iexec_out/");
  worker.setCB(cb);
  await worker.work(query,Types.INTERNAL_TEST_REQUEST_ID_REJECT_3);   
}
const test_05 =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_05((data:any) => {
              resolve(data===null);
        });
      }catch(err){
          console.log("UseCase-Zion->Err: ",err);
          resolve(false);
      }
  })
}

const _test_06 =async function(cb:(ris:any) => void){
  try{
    const worker = new Worker(undefined);
    worker.setCB(cb);
    await worker.work("","");   
  }catch(err){
    cb(null)
  }
}

const test_06 =async ()=>{
  return new Promise((resolve, reject) => {
    try{
      _test_06((data:any) => {
            resolve(data===null);
      });
    }catch(err){
        console.log("UseCase-Zion->Err: ",err);
        resolve(true);
    }
})
}

const _test_07 =async function(cb:(ris:any) => void){
  try{
    const worker = new Worker(undefined);
    worker.setCB(cb);
    await worker.work("",Types.INTERNAL_TEST_REQUEST_ID_REJECT_3);   
  }catch(err){
    cb(null)
  }
}

const test_07 =async ()=>{
  return new Promise((resolve, reject) => {
    try{
      _test_07((data:any) => {
            resolve(data===null);
      });
    }catch(err){
        console.log("UseCase-Zion->Err: ",err);
        resolve(true);
    }
})
}

//-------------------------------------------


test('UseCaseTest.test02', async () => {
    const ris=await test_02();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test03', async () => {
    const ris=await test_03();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test04', async () => {
    const ris=await test_04();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test05', async () => {
    const ris=await test_05();
    expect(ris).toEqual(true);
});

test('UseCaseTest.test06', async () => {
    try{
        expect(await test_06()).toEqual(true);
    }catch(err){
        console.log("err",err);
    }
});


test('UseCaseTest.test07', async () => {
    try{
        expect(await test_07()).toEqual(true);
    }catch(err){
        console.log("err",err);
    }
});
