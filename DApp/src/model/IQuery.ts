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
    maxDistanceFromCenter: {
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

export default interface IQuery {
    prefixList?: Array<IPrefix>;
    property: {
        identifier: string;
        unit: string;
        datatype: RequestedDataType;
    };
    staticFilter?: string;
    dynamicFilter?: string;
    geoFilter?: {
        region?: IGeoCircle | IGeoPolygon;
        altitudeRange?: {
            min: number;
            max: number;
            unit: string;
        };
    };
    timeFilter?: {
        until: string;
        interval: string;
        aggregation: string;
    };
};
