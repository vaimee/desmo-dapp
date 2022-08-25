"use strict";
//############################### VALID QUERIES ####################################
Object.defineProperty(exports, "__esModule", { value: true });
exports.query_getter_05 = exports.query_getter_04 = exports.query_getter_03 = exports.query_getter_02 = exports.query_getter_01 = exports.query_invalid_09 = exports.query_invalid_08 = exports.query_invalid_07 = exports.query_invalid_06 = exports.query_invalid_05 = exports.query_invalid_04 = exports.query_invalid_03 = exports.query_invalid_02 = exports.query_invalid_01 = exports.query_valid_11 = exports.query_valid_10 = exports.query_valid_09 = exports.query_valid_08 = exports.query_valid_07 = exports.query_valid_06 = exports.query_valid_05 = exports.query_valid_04 = exports.query_valid_03 = exports.query_valid_02 = exports.query_valid_01 = void 0;
exports.query_valid_01 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;
exports.query_valid_02 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"
}`;
exports.query_valid_03 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'"
}`;
exports.query_valid_04 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
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
  }
}`;
exports.query_valid_05 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "timeFilter": {
    "until": "2022-12-31T23:59:59Z",
    "interval": "PT10M",
    "aggregation": "desmo:Average"
  }
}`;
exports.query_valid_06 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
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
}`;
//unit is identified with an URI
exports.query_valid_07 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "http://qudt.org/schema/qudt/DEG_C",
    "datatype": 1
  }
}`;
exports.query_valid_08 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "geoFilter": {
    "region": {
      "vertices": [{
        "latitude": 41.9109,
        "longitude": 12.4818
      },
      {
        "latitude": 45.9109,
        "longitude": 12.4818
      },
      {
        "latitude": 41.9109,
        "longitude": 17.4818
      }
    ],
    "altitudeRange": {
      "min": 0,
      "max": 500,
      "unit": "qudt:M"
    }
  }
}
}`;
//valid query without the identifier being bound to be an URI
exports.query_valid_09 = `{
  "prefixList": [
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"}
  ],
  "property": {
    "identifier": "Temperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;
//valid query without the property unit being bound to be an URI
exports.query_valid_10 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"}
  ],
  "property": {
    "identifier": "desmo:Temperature",
    "unit": "DEG_C",
    "datatype": 1
  }
}`;
//valid query without the geoFilter's units being bound to be an URI
exports.query_valid_11 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
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
        "unit": "KiloM"
      }
    },
    "altitudeRange": {
      "min": 0,
      "max": 500,
      "unit": "M"
    }
  },
  
  "timeFilter": {
    "until": "2022-12-31T23:59:59Z",
    "interval": "PT10M",
    "aggregation": "desmo:Average"
  }
}`;
//############################### INVALID QUERIES ####################################
//miss property
exports.query_invalid_01 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ]
}`;
//miss one field of property
exports.query_invalid_02 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;
// a field of property is an empty string
exports.query_invalid_03 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;
//unit prefix not in prefix list
exports.query_invalid_04 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "notin:DEG_C",
    "datatype": 1
  }
}`;
//invalid staticFilter (wrong JsonPath syntax: missing $ in the beginning)
exports.query_invalid_05 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"
}`;
//invalid staticFilter (valid JsonPath syntax but it's not a filter)
exports.query_invalid_06 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$.store.book[0].title"
}`;
//invalid geoFilter (missing center)
exports.query_invalid_07 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "geoFilter": {
    "region": {
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
  }
}`;
//invalid geoFilter (missing value from latitude)
exports.query_invalid_08 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "geoFilter": {
    "region": {
      "center": {
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
  }
}`;
//invalid geoFilter  (missing one latitude)
exports.query_invalid_09 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "geoFilter": {
    "region": {
      "vertices": [{
        "longitude": 12.4818
      },
      {
        "latitude": 45.9109,
        "longitude": 12.4818
      },
      {
        "latitude": 41.9109,
        "longitude": 17.4818
      }
    ],
    "altitudeRange": {
      "min": 0,
      "max": 500,
      "unit": "qudt:M"
    }
  }
}
}`;
//############################### VALID QUERIES TO TEST GETTERS FUNCTIONS ####################################
exports.query_getter_01 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;
exports.query_getter_02 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 0
  }
}`;
exports.query_getter_03 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 2
  }
}`;
exports.query_getter_04 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 3
  }
}`;
exports.query_getter_05 = `{
  "prefixList": [
    {"abbreviation":"desmo", "completeURI":"https://desmo.vaimee.it/"},
    {"abbreviation":"qudt", "completeURI":"http://qudt.org/schema/qudt/"},
    {"abbreviation":"onto",  "completeURI":"http://onto.org/ontologies/base/"}
  ],
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"
}`;
