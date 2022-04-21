
import Worker from "../component/Worker";

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
  "prefixList": {
    "monas": "https://pod.dasibreaker.vaimee.it/monas/",
    "xsd": "http://www.w3.org/2001/XMLSchema/"
  },
  "property": {
    "identifier": "value",
    "unit": "xsd:string",
    "datatype": 2
  },
  "staticFilter": "$[?(@.title=='stopligth_01')]",
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

const test_01 =function(cb:() => void){
    console.log("WARNING: Use case test 01 NOT FINISHED YET");
    console.log("WARNING: Use case test 01 NOT FINISHED YET");
    console.log("WARNING: Use case test 01 NOT FINISHED YET");
    const worker = new Worker();
    worker.work(query,directoriesList);
    

    cb();
}

export default {
    test_01: test_01,
}