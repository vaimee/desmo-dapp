import IQuery, { IGeoAltitudeRange, IGeoCircle, IGeoPolygon, IPrefix, ITimeFilter } from "../model/IQuery";


export default interface IQueryParser {


    parse():void;

    isValid(): boolean ;

    isAskingForNumber(): boolean ;

    isAskingForString(): boolean ;

    isAskingForBoolean(): boolean ;

    getType():number;

    getJsonPath():string|null;

    getPrefixList():IPrefix[]|null;

    getPropertyIdentifier():string;

    getPropertyUnit():string;

    getParsedQuery():IQuery;

    getPropertyDatatype(): number;

    getDynamicFilter(): string | null;

    getGeoFilterRegion(): IGeoCircle | IGeoPolygon | null;

    getGeoFilterAltitudeRange(): IGeoAltitudeRange | null;

    getTimeFilter(): ITimeFilter | null;

    


}