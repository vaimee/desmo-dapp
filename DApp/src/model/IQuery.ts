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
        datatype: number;
    };
    staticFilter?: string;
    dynamicFilter?: string;
    geoFilter?: {
        region?: IGeoCircle | IGeoPolygon;
        altitudeRange?: IGeoAltitudeRange;
    };
    timeFilter?: ITimeFilter;
};
