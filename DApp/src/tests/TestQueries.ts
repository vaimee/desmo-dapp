//############################### VALID QUERIES ####################################


export const query_valid_01: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;

export const query_valid_02: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"
}`;

export const query_valid_03: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "dynamicFilter": "(READ desmo:WindSpeed UNIT qudt:KiloM_PER_HR) >= 20.0 || (READ desmo:Status UNIT xsd:string) == 'Activated'"
}`;


export const query_valid_04: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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

export const query_valid_05: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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


export const query_valid_06: string = `{
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
}`;

//unit is identified with an URI
export const query_valid_07: string = `{
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "http://qudt.org/schema/qudt/DEG_C",
    "datatype": 1
  }
}`;

//invalid geoFilter 
export const query_valid_08: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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




//############################### INVALID QUERIES ####################################

//miss property
export const query_invalid_01: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  }
}`;

//miss one field of property
export const query_invalid_02: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;

// a field of property is an empty string
export const query_invalid_03: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "",
    "unit": "qudt:DEG_C",
    "datatype": 1
  }
}`;

//unit prefix not in prefix list
export const query_invalid_04: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "notin:DEG_C",
    "datatype": 1
  }
}`;

//invalid staticFilter (wrong JsonPath syntax: missing $ in the beginning)
export const query_invalid_05: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "[?((@.title != 'test' && @.type == 'onto:Sensor') || @.actions.moveLeft)]"
}`;

//invalid staticFilter (valid JsonPath syntax but it's not a filter)
export const query_invalid_06: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
  "property": {
    "identifier": "desmo:OutdoorTemperature",
    "unit": "qudt:DEG_C",
    "datatype": 1
  },
  "staticFilter": "$.store.book[0].title"
}`;

//invalid geoFilter (missing center)
export const query_invalid_07: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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
export const query_invalid_08: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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
export const query_invalid_09: string = `{
  "prefixList": {
    "desmo": "https://desmo.vaimee.it/",
    "qudt": "http://qudt.org/schema/qudt/"
  },
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