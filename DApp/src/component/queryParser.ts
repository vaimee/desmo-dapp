
import Types from "../const/Types";
import IQuery, { IGeoCircle, IGeoPolygon, IPrefix, RequestedDataType } from "../model/IQuery";
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
        if (this.parsedQuery.prefixList !== undefined) {
        }
        if (this.parsedQuery.prefixList != null && this.parsedQuery.prefixList.length > 0) {
            for (let prefix of this.parsedQuery.prefixList) {
                if (prefix.abbreviation == null || prefix.abbreviation == "" || prefix.completeURI == null || prefix.completeURI == "") {
                    this.valid = false;
                    return;
                }
            }
        }

        //The property to be read is mandatory
        if (this.parsedQuery.property == null) { this.valid = false; return; }
        if (this.parsedQuery.property.identifier == null ||
            this.parsedQuery.property.identifier == "" ||
            this.parsedQuery.property.unit == null ||
            this.parsedQuery.property.unit == "" ||
            validateUnit(this.parsedQuery.property.unit, this.parsedQuery.prefixList) == false ||
            this.parsedQuery.property.datatype == null) { this.valid = false; return; }


        //The static filter is optional
        if (this.parsedQuery.staticFilter != null && this.parsedQuery.staticFilter != "") {
            //The static filter must be a valid JSON-path query
            if (JsonPathValidator(this.parsedQuery.staticFilter) == false) { this.valid = false; return; }

        }

        //The dynamic filter is optional
        if (this.parsedQuery.dynamicFilter != null && this.parsedQuery.dynamicFilter != "") {
            //check if the dynamic filter is valid
        }

        //The geo filter is optional
        if (this.parsedQuery.geoFilter != null) {
            if (this.parsedQuery.geoFilter.region != null && geofilterValidator(this.parsedQuery.geoFilter.region) == false) { this.valid == false; return; }
            if (this.parsedQuery.geoFilter.altitudeRange != null) {
                if (this.parsedQuery.geoFilter.altitudeRange.min == null ||
                    this.parsedQuery.geoFilter.altitudeRange.max == null ||
                    this.parsedQuery.geoFilter.altitudeRange.unit == null ||
                    this.parsedQuery.geoFilter.altitudeRange.unit == "" ||
                    validateUnit(this.parsedQuery.geoFilter.altitudeRange.unit, this.parsedQuery.prefixList) == false) { this.valid = false; return; }
            }
        }

        //The time filter is optional
        if (this.parsedQuery.timeFilter != null) {
            if (this.parsedQuery.timeFilter.until == null ||
                this.parsedQuery.timeFilter.interval == null ||
                this.parsedQuery.timeFilter.interval == "" ||
                this.parsedQuery.timeFilter.aggregation == null ||
                this.parsedQuery.timeFilter.aggregation == "") { this.valid = false; return; }
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


}

function JsonPathValidator(staticFilter: string) {
    staticFilter = staticFilter.trim();
    try{
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
function geofilterValidator(geoFilter: IGeoCircle | IGeoPolygon) {
    //TODO
    return true;
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

