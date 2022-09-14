import IQuery, { IGeoAltitudeRange, IGeoCircle, IGeoPolygon, IPrefix, ITimeFilter } from "../model/IQuery";
import IGeoFilter from "./IGeoFilter";


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

    getPropertyDatatype(): number;

    getDynamicFilter(): string | null;

    getGeoFilterRegion(): IGeoCircle | IGeoPolygon | null;

    getGeoFilterAltitudeRange(): IGeoAltitudeRange | null;

    getTimeFilter(): ITimeFilter | null;

    getGeoFilter():IGeoFilter|null;

}