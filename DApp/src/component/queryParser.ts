
import Types from "../const/Types";
import IQuery, { IGeoCircle, IGeoPolygon, RequestedDataType } from "../model/IQuery";
import IQueryParser from "./IQueryParser";

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
        if (this.parsedQuery.prefixList != null) {
            //check if the prefix list is valid
        }

        //The property to be read is mandatory
        if (this.parsedQuery.property == null) { this.valid == false; return; }
        if (this.parsedQuery.property.identifier == null ||
            this.parsedQuery.property.identifier == "" ||
            this.parsedQuery.property.unit == null ||
            this.parsedQuery.property.unit == "" ||
            validateUnit(this.parsedQuery.property.unit)==false ||
            this.parsedQuery.property.datatype == null) { this.valid == false; return; }

        //The static filter is optional
        if (this.parsedQuery.staticFilter != null && this.parsedQuery.staticFilter != "") {
            //The static filter must be a valid JSON-path query
            if (JsonPathValidator(this.parsedQuery.staticFilter) == false) { this.valid == false; return; }

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
                    validateUnit(this.parsedQuery.geoFilter.altitudeRange.unit)==false) { this.valid == false; return; }
            }
        }

        //The time filter is optional
        if (this.parsedQuery.timeFilter != null) {
            if (this.parsedQuery.timeFilter.until == null ||
                this.parsedQuery.timeFilter.interval == null ||
                this.parsedQuery.timeFilter.interval == "" ||
                this.parsedQuery.timeFilter.aggregation == null ||
                this.parsedQuery.timeFilter.aggregation == "") { this.valid == false; return; }
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
        return this.parsedQuery.property.datatype === RequestedDataType.Boolean;
    }

    getType(): number {
        return this.parsedQuery.property.datatype;
    }

    getParsedQuery(): IQuery {
        return this.parsedQuery;
    }


}

function JsonPathValidator(staticFilter: string) {
    //TODO
    return true;

}
function geofilterValidator(geoFilter: IGeoCircle | IGeoPolygon) {
    //TODO
    return true;
}

function validateUnit(unit: string) {
    //TODO
    return true;
}

