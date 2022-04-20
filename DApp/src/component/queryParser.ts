
import Types from "../const/Types";
import IQuery, { IGeoAltitudeRange, IGeoCircle, IGeoPolygon, IPrefix, ITimeFilter, RequestedDataType } from "../model/IQuery";
import IQueryParser from "./IQueryParser";
var jp = require('jsonpath');

//##################################WIP
//##################################WIP
//##################################WIP



export default class QueryParser implements IQueryParser {

    query: string;
    valid: boolean;
    parsedQuery: IQuery;

    constructor(query: string) {
        this.query = query;
        this.parsedQuery = JSON.parse(this.query) as IQuery;
        this.valid = false;
        this.parse();
    }

    parse() {
        //The prefix list is optional
        if (this.parsedQuery.prefixList != undefined) {
            if (this.parsedQuery.prefixList != null && this.parsedQuery.prefixList.length > 0) {
                for (let prefix of this.parsedQuery.prefixList) {
                    if (prefix.abbreviation == null || prefix.abbreviation == "" || prefix.completeURI == null || prefix.completeURI == "") {
                        this.valid = false;
                        return;
                    }
                }
            }
        }


        //The property to be read is mandatory
        if (this.parsedQuery.property == null) { this.valid = false; return; }
        if (this.parsedQuery.property.identifier == null ||
            this.parsedQuery.property.identifier.trim() == "" ||
            validateUnit(this.parsedQuery.property.identifier, this.parsedQuery.prefixList ) == false ||
            this.parsedQuery.property.unit == null ||
            this.parsedQuery.property.unit.trim() == "" ||
            validateUnit(this.parsedQuery.property.unit, this.parsedQuery.prefixList) == false ||
            this.parsedQuery.property.datatype == null) { this.valid = false; return; }


        //The static filter is optional
        if (this.parsedQuery.staticFilter != null && this.parsedQuery.staticFilter.trim() != "") {
            //The static filter must be a valid JSON-path query
            if (JsonPathValidator(this.parsedQuery.staticFilter) == false) { this.valid = false; return; }

        }

        //The dynamic filter is optional
        if (this.parsedQuery.dynamicFilter != null && this.parsedQuery.dynamicFilter.trim() != "") {
            //check if the dynamic filter is valid
        }

        //The geo filter is optional
        if (this.parsedQuery.geoFilter != null) {
            if (this.parsedQuery.geoFilter.region != null && geofilterValidator(this.parsedQuery.geoFilter.region, this.parsedQuery.prefixList) == false) { this.valid == false; return; }
            if (this.parsedQuery.geoFilter.altitudeRange != null) {
                if (this.parsedQuery.geoFilter.altitudeRange.min == null ||
                    this.parsedQuery.geoFilter.altitudeRange.max == null ||
                    this.parsedQuery.geoFilter.altitudeRange.unit == null ||
                    this.parsedQuery.geoFilter.altitudeRange.unit.trim() == "" ||
                    validateUnit(this.parsedQuery.geoFilter.altitudeRange.unit, this.parsedQuery.prefixList) == false) { this.valid = false; return; }
            }
        }

        //The time filter is optional
        if (this.parsedQuery.timeFilter != null) {
            if (this.parsedQuery.timeFilter.until == null ||
                this.parsedQuery.timeFilter.interval == null ||
                this.parsedQuery.timeFilter.interval.trim() == "" ||
                this.parsedQuery.timeFilter.aggregation == null ||
                this.parsedQuery.timeFilter.aggregation.trim() == "") { this.valid = false; return; }
        }

        this.valid = true;
    }

    isValid(): boolean {
        return this.valid;
    }

    isAskingForNumber(): boolean {
        if (this.parsedQuery.property.datatype === RequestedDataType.Integer ||
            this.parsedQuery.property.datatype === RequestedDataType.Decimal) {
            return true;
        }
        return false;
    }

    isAskingForBoolean(): boolean {
        return this.parsedQuery.property.datatype === RequestedDataType.Boolean;
    }


    isAskingForString(): boolean {
        return this.parsedQuery.property.datatype === RequestedDataType.String;
    }

    getType(): number {
        return this.parsedQuery.property.datatype;
    }

    getParsedQuery(): IQuery {
        return this.parsedQuery;
    }

    //getter methods

    getJsonPath(): string | null {
        if (this.parsedQuery.staticFilter !== undefined && this.parsedQuery.staticFilter !== null && this.parsedQuery.staticFilter.trim() !== "") {
            return this.parsedQuery.staticFilter;
        } else {
            return null;
        }
    }

    getPrefixList(): IPrefix[] | null {
        if (this.parsedQuery.prefixList !== undefined && this.parsedQuery.prefixList !== null && this.parsedQuery.prefixList.length > 0) {
            return this.parsedQuery.prefixList;
        } else {
            return null;
        }
    }

    getPropertyIdentifier(): string {
        return this.parsedQuery.property.identifier;
    }

    getPropertyUnit(): string {
        return this.parsedQuery.property.unit;
    }

    getPropertyDatatype(): number {
        return this.parsedQuery.property.datatype;
    }

    getDynamicFilter(): string | null {
        if (this.parsedQuery.dynamicFilter !== undefined && this.parsedQuery.dynamicFilter !== null && this.parsedQuery.dynamicFilter.trim() !== "") {
            return this.parsedQuery.dynamicFilter;
        } else {
            return null;
        }
    }

    getGeoFilterRegion(): IGeoCircle | IGeoPolygon | null {
        if (this.parsedQuery.geoFilter !== undefined && this.parsedQuery.geoFilter !== null && this.parsedQuery.geoFilter.region !== undefined && this.parsedQuery.geoFilter.region !== null) {
            return this.parsedQuery.geoFilter.region;
        } else {
            return null;
        }
    }


    getGeoFilterAltitudeRange(): IGeoAltitudeRange | null {
        if (this.parsedQuery.geoFilter !== undefined && this.parsedQuery.geoFilter !== null && this.parsedQuery.geoFilter.altitudeRange !== undefined && this.parsedQuery.geoFilter.altitudeRange !== null) {
            return this.parsedQuery.geoFilter.altitudeRange;
        } else {
            return null;
        }
    }


    getTimeFilter(): ITimeFilter | null {
        if (this.parsedQuery.timeFilter !== undefined && this.parsedQuery.timeFilter !== null) {
            return this.parsedQuery.timeFilter;
        } else {
            return null;
        }
    }




}

function JsonPathValidator(staticFilter: string) {
    staticFilter = staticFilter.trim();
    try {
        const parsedFilter = jp.parse(staticFilter);
        //only filter expression
        if (parsedFilter.length != 2 ||
            parsedFilter[0].expression.type != "root" ||
            parsedFilter[0].expression.value != "$" ||
            parsedFilter[1].expression.type != "filter_expression") { return false; }
    }
    catch (_) {
        return false;
    }
    
    return true;

}
function geofilterValidator(geoFilter: IGeoCircle | IGeoPolygon, prefixList: IPrefix[] | undefined) {
    const geoFilterCircle = geoFilter as IGeoCircle;
    const geoFilterPolygon = geoFilter as IGeoPolygon;
    if (geoFilterCircle.center != null && geoFilterCircle.radius != null && geoFilterCircle.center.latitude != null &&
        geoFilterCircle.center.longitude != null && geoFilterCircle.radius.value != null && geoFilterCircle.radius.unit != null &&
        geoFilterCircle.radius.unit != "" && validateUnit(geoFilterCircle.radius.unit, prefixList) == true) {
        return true;
    }
    else if (geoFilterPolygon.vertices != null && geoFilterPolygon.vertices != null && geoFilterPolygon.vertices.length > 0) {
        for (let coordinate of geoFilterPolygon.vertices) {
            if (coordinate.latitude == null || coordinate.longitude == null) { return false; }
        }
        return true;

    }
    return false

}

function validateUnit(unit: string, prefixList: IPrefix[] | undefined): boolean {

    unit = unit.trim();
    // if it's an URL, it's valid
    //check if it is a valid URI
    if (isValidHttpUrl(unit)) {
        return true;
    }

    const slices: string[] = unit.split(":") as string[];
    if (slices.length != 2) { return false; }
    const abbreviationList: string[] = [];
    if (prefixList !== undefined) {
        for (let i = 0; i < Object.keys(prefixList).length; i++) {
            abbreviationList.push(Object.keys(prefixList)[i]);
        }
    }
    if (!(abbreviationList.includes(slices[0]))) { return false; }
    return true;
}


function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

