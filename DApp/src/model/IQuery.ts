export enum RequestedDataType {
    Integer = 0,
    Decimal = 1,
    Boolean = 2,
    String = 3
}

export interface IGeoPosition {
    latitude: number;
    longitude: number;
};

export interface IGeoCircle {
    center: IGeoPosition;
    radius: {
        value: number;
        unit: string;
    };
};

export interface IGeoPolygon {
    vertices: IGeoPosition[];
};

export interface IPrefix {
    abbreviation: string;
    completeURI: string;
};

export interface IGeoAltitudeRange {
    min: number;
    max: number;
    unit: string;
}

export interface ITimeFilter {
    until: string;
    interval: string;
    aggregation: string;
}

export default interface IQuery {
    prefixList?: IPrefix[];
    property: {
        identifier: string;
        unit: string;
        datatype: RequestedDataType;
    };
    staticFilter?: string;
    dynamicFilter?: string;
    geoFilter?: {
        region?: IGeoCircle | IGeoPolygon;
        altitudeRange?: IGeoAltitudeRange;
    };
    timeFilter?: ITimeFilter;
};
