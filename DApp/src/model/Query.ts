import IQuery, { IGeoAltitudeRange, IGeoCircle, IGeoPolygon, IPrefix, ITimeFilter } from "./IQuery";


export default class Query implements IQuery {
    property: { identifier: string; unit: string; datatype: number; };
    prefixList?: IPrefix[] | undefined;
    staticFilter?: string | undefined;
    dynamicFilter?: string | undefined;
    geoFilter?: { region?: IGeoCircle | IGeoPolygon | undefined; altitudeRange?: IGeoAltitudeRange | undefined; } | undefined;
    timeFilter?: ITimeFilter | undefined;

    constructor(identifier: string, unit: string, datatype: number){
        this.property={identifier,unit,datatype};
    }

  
  
}