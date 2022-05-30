
import Worker from "../src/component/Worker";

const q6 = JSON.stringify({
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]",
  "dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'",
  "geoFilter": {
    "region": {
      "center": {
        "latitude": 41.9109,
        "longitude": 12.4818
      },
      "radius": {
        "value": 50.0,
        "unit": "qudt:KiloM"
      }
    },
    "altitudeRange": {
      "min": 0,
      "max": 500,
      "unit": "qudt:M"
    }
  },
  
  "timeFilter": {
    "until": "2022-12-31T23:59:59Z",
    "interval": "PT10M",
    "aggregation": "desmo:Average"
  }
});
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
  "staticFilter": "$[?(@.'@type'=='ControlUnit')]",
  //"dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'",
  // "geoFilter": {
  //   "region": {
  //     "center": {
  //       "latitude": 41.9109,
  //       "longitude": 12.4818
  //     },
  //     "radius": {
  //       "value": 50.0,
  //       "unit": "qudt:KiloM"
  //     }
  //   },
  //   "altitudeRange": {
  //     "min": 0,
  //     "max": 500,
  //     "unit": "qudt:M"
  //   }
  // },
  
  // "timeFilter": {
  //   "until": "2022-12-31T23:59:59Z",
  //   "interval": "PT10M",
  //   "aggregation": "desmo:Average"
  // }
});


//directoriesList.length must be multiple of 4
const directoriesList=[0,4,5,1,2,6,8,9];

const _test_01 =function(cb:(ris:any) => void):void{
    const worker = new Worker("./mount/iexec_out/");
    worker.setCB(cb);
    worker.work(query,directoriesList);   
    
}

const test_01 =async ()=>{
  return new Promise((resolve, reject) => {
      try{
        _test_01((data:any) => {
              resolve(data!==null);
        });
      }catch(err){
          console.log("UseCase->Err: ",err);
          resolve(false);
      }
  })
}

export default {
    test_01: test_01,
}