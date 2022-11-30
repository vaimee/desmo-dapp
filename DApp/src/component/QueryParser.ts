import IQuery, { IGeoAltitudeRange, IGeoCircle, IGeoPolygon, IGeoPosition, IPrefix, ITimeFilter ,RequestedDataType} from "../model/IQuery";
import IQueryParser from "./IQueryParser";
import Config from "../const/Config";
import Const from "../const/Const";
var jp = require('jsonpath'); //import jp from "jsonpath"; DO NOT WORK :( 

import IGeoFilter from "./IGeoFilter";
import GeoFilter from "./GeoFilter";
import Query from "../model/Query";
const componentName = "QueryParser";

export default class QueryParser implements IQueryParser {



    private valid: boolean;
    private parsedQuery: IQuery;
    private geoFilter: IGeoFilter|null;

    public _PROPERTY_UNIT_IS_URI = Config.PROPERTY_UNIT_IS_URI;
    public _GEOFILTER_UNIT_IS_URI = Config.GEOFILTER_UNIT_IS_URI;
    public _PROPERTY_IDENTIFIER_IS_URI = Config.PROPERTY_IDENTIFIER_IS_URI;

    constructor(query: string|Query) {
        if(query instanceof Query ){
            this.parsedQuery =query;
        }else{
            this.parsedQuery = JSON.parse(query) as IQuery;
        }
        this.valid = false;
        this.geoFilter=null;
    }


    static convertFromArgs(args:string[]):Query{
        const hasNextSubArg =(x:number)=>{return args.length>x && (args[x].startsWith===undefined || !args[x].startsWith("--"))}
        const argsTemplate = "requestID identifier unit datatype [--prefixList abbreviation1:completeURI1 abbreviation2:completeURI2] [--staticFilter staticFilter] [--dynamicFilter dynamicFilter] [--timeFilter until interval aggregation]"+
        " [(--geoCircle centerLatitude centerLongitude radiusValue radiusUnit ) || (--geoPolygon latitude1 longitude1 latitude2 longitude2)]"+
        " [--geoAltitude min max unit]";
        // property: { identifier: string; unit: string; datatype: number; };
        // prefixList?: IPrefix[] | undefined;
        // staticFilter?: string | undefined;
        // dynamicFilter?: string | undefined;
        // geoFilter?: { region?: IGeoCircle | IGeoPolygon | undefined; altitudeRange?: IGeoAltitudeRange | undefined; } | undefined;
        // timeFilter?: ITimeFilter | undefined;
        const identifier =args[3].trim();
        const unit =args[4].trim();
        const datatype =Number(args[5]);
        let query= new Query(identifier,unit,datatype);
        const prefixList =new  Array<IPrefix>();
        let staticFilter:string|undefined;
        let dynamicFilter:string|undefined;
        let timeFilter:ITimeFilter|undefined;
        let geoFilter:{ region?: IGeoCircle | IGeoPolygon | undefined; altitudeRange?: IGeoAltitudeRange | undefined; } | undefined;
        let geoCircle:IGeoCircle|undefined;
        let geoPolygons=new  Array<IGeoPosition>();
        let geoAltitude:IGeoAltitudeRange|undefined;
        for(let x =6 ;x<args.length;x++){
            if(args[x].startsWith("--")){
                const prop = args[x].substring(2);
                x++;
                while(hasNextSubArg(x)){
                    if(prop==="prefixList"){
                        const i = args[x].indexOf(":");
                        if(i<1 || i>args[x].length-1){
                            console.log("APP","Error parsing args, not valid prefixList (ignored) for: "+ args[x]);
                        }else{
                            const abbreviation= args[x].substring(0,i);
                            const completeURI= args[x].substring(i+1);
                            prefixList.push({abbreviation,completeURI});
                        }
                    }else if(prop==="staticFilter"){
                        staticFilter=args[x];
                    }else if(prop==="dynamicFilter"){
                        dynamicFilter=args[x];
                    }else if(prop==="timeFilter"){
                        const until= args[x];
                        x++;
                        const interval= args[x];
                        x++;
                        const aggregation= args[x];
                        timeFilter={until,interval,aggregation};
                    }else if(prop==="geoCircle"){
                        const centerLatitude= Number(args[x]);
                        x++;
                        const centerLongitude= Number(args[x]);
                        x++;
                        const radiusValue= Number(args[x]);
                        x++;
                        const radiusUnit= args[x];
                        geoCircle={center:{latitude:centerLatitude,longitude:centerLongitude},radius:{value:radiusValue,unit:radiusUnit}};
                    }else if(prop==="geoPolygon"){
                        const latitude= Number(args[x]);
                        x++;
                        const longitude= Number(args[x]);
                        geoPolygons.push({latitude,longitude});
                    }else if(prop==="geoAltitude"){
                        const min= Number(args[x]);
                        x++;
                        const max= Number(args[x]);
                        x++;
                        const unit= args[x];
                        geoAltitude={min,max,unit};
                    }else if (prop === "encodedStaticFilter") {
                        staticFilter = Buffer.from(args[x], "base64").toString('utf-8');
                    }else{
                        console.log("APP","Error parsing args, not valid arg for: --"+prop);
                        console.log("APP","Args should be: "+ argsTemplate);
                        throw new Error("Error parsing args");
                    }
                    x++;
                }
                x--;
            }else{
                console.log("APP","Error parsing args, for: "+ args[x]);
                console.log("APP","Args should be: "+ argsTemplate);
                throw new Error("Error parsing args");
            }
        }
        if(geoCircle!==undefined && geoPolygons.length>0){
            console.log("APP","Error parsing args, you can't use both --geoCircle and --geoPolygons (ignored geoPolygons)");
            console.log("APP","Args should be: "+ argsTemplate);
            geoFilter= {region:geoCircle,altitudeRange:geoAltitude};
        }else if(geoCircle!==undefined){
            geoFilter= {region:geoCircle,altitudeRange:geoAltitude};
        }else if(geoPolygons.length>0){
            geoFilter= {region:{vertices:geoPolygons},altitudeRange:geoAltitude};
        }
        query.prefixList=prefixList;
        query.geoFilter=geoFilter;
        query.timeFilter=timeFilter;
        query.staticFilter=staticFilter;
        query.dynamicFilter=dynamicFilter;
        return query;
    }

    parse() {
        //The prefix list is optional
        if (this.parsedQuery?.prefixList && this.parsedQuery?.prefixList?.length > 0) {
            for (let prefix of this.parsedQuery.prefixList) {
                if (prefix.abbreviation?.trim() == "" || prefix.completeURI?.trim() == "") {
                    console.log(componentName,"Invalid prefix",true);
                    this.valid = false;
                    return;
                }
            }
        }


        //The property to be read is mandatory
        if (!this.parsedQuery.property) { 
            console.log(componentName,"Missing property",true);
            this.valid = false; return; 
        }
        if (!this.parsedQuery?.property?.identifier || (this.parsedQuery?.property?.identifier && this.parsedQuery?.property?.identifier.trim() == "") 
        || (this._PROPERTY_IDENTIFIER_IS_URI &&
            !validateUnit(this.parsedQuery.property.identifier, this.parsedQuery.prefixList)) || !this.parsedQuery?.property?.unit ||
            (this.parsedQuery?.property?.unit &&
                this.parsedQuery?.property?.unit?.trim() == "") || (this._PROPERTY_UNIT_IS_URI &&
                    !validateUnit(this.parsedQuery.property.unit, this.parsedQuery.prefixList)) ||
            this.parsedQuery?.property?.datatype == null) {
            console.log(componentName,"Invalid property",true);
            this.valid = false;
            return;
        }


        //The static filter is optional
        if (this.parsedQuery?.staticFilter && this.parsedQuery?.staticFilter?.trim() != "") {
            //The static filter must be a valid JSON-path query
            if (!JsonPathValidator(this.parsedQuery.staticFilter, this.parsedQuery.prefixList)) {
                console.log(componentName,"Invalid static filter",true);
                this.valid = false; return;
            }
        }

        //The dynamic filter is optional
        if (this.parsedQuery.dynamicFilter != null && this.parsedQuery.dynamicFilter.trim() != "") {
            //check if the dynamic filter is valid
        }

        //The geo filter is optional
        if (this.parsedQuery?.geoFilter && this.parsedQuery?.geoFilter?.region && !geofilterValidator(this._GEOFILTER_UNIT_IS_URI, this.parsedQuery.geoFilter.region, this.parsedQuery.prefixList)) { 
            console.log(componentName,"Invalid region inside the geo filter",true);
            this.valid = false; return; }
        if (this.parsedQuery?.geoFilter?.altitudeRange && (this.parsedQuery?.geoFilter?.altitudeRange?.min == null || this.parsedQuery?.geoFilter?.altitudeRange?.max == null ||
            !this.parsedQuery?.geoFilter?.altitudeRange?.unit || this.parsedQuery?.geoFilter?.altitudeRange?.unit.trim() == "" ||
            (this._GEOFILTER_UNIT_IS_URI && !validateUnit(this.parsedQuery.geoFilter.altitudeRange.unit, this.parsedQuery.prefixList)))) {
            console.log(componentName,"Invalid altitude range inside the geo filter",true);
            this.valid = false;
            return;
        }
        if(this.parsedQuery?.geoFilter!==undefined){
            this.geoFilter= new GeoFilter(this.parsedQuery?.geoFilter);
        }
        //The time filter is optional
        if (this.parsedQuery?.timeFilter && (!this.parsedQuery?.timeFilter?.until || !this.parsedQuery?.timeFilter?.interval ||
            (!this.parsedQuery?.timeFilter?.interval && this.parsedQuery?.timeFilter?.interval.trim() == "") || !this.parsedQuery?.timeFilter?.aggregation ||
            (!this.parsedQuery?.timeFilter?.aggregation && this.parsedQuery?.timeFilter?.aggregation.trim() == ""))) {
            console.log(componentName,"Invalid time filter",true);
            this.valid = false; return;
        }

        this.valid = true;
    }

    isValid(): boolean {
        return this.valid;
    }

    isAskingForNumber(): boolean {
        if (this.parsedQuery.property.datatype ===RequestedDataType.Decimal||
            this.parsedQuery.property.datatype === RequestedDataType.Integer ){
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

    getJsonPath(): string | null {
        if (this.parsedQuery.staticFilter !== undefined && this.parsedQuery.staticFilter !== null && this.parsedQuery.staticFilter.trim() !== "") {
            return this.parsedQuery.staticFilter;
        } else {
            return null;
        }
    }

    getPrefixList(): IPrefix[] | null {
        const ResultPrefix: IPrefix[] = [];
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


    getGeoFilter():IGeoFilter|null{
       return this.geoFilter;
    }

    getRawGeoFilter(): {
        region?: IGeoCircle | IGeoPolygon | undefined;
        altitudeRange?: IGeoAltitudeRange | undefined;
    } | undefined{
        return this.parsedQuery.geoFilter;
    }


}

function JsonPathValidator(staticFilter: string, prefixList: IPrefix[] | undefined): boolean {
    /*
    staticFilter = staticFilter.trim();
    try {
        const parsedFilter = jp.parse(staticFilter);
        //only filter expression
        if (parsedFilter.length != 2 ||
            parsedFilter[0].expression.type != "root" ||
            parsedFilter[0].expression.value != "$" ||
            parsedFilter[1].expression.type != "filter_expression") { return false; }
    }
    catch (err) {
        console.log(componentName,"Error on JsonPathValidator: " +JSON.stringify(err),true);
        return false;
    }

    //check prefixes inside the JsonPath

    const abbreviationList: string[] = [];
    if (prefixList !== undefined) {
        for (let i = 0; i < prefixList.length; i++) {
            abbreviationList.push(prefixList[i].abbreviation);
        }
    }

    const statiFilterSplitted = staticFilter.split(/(\s+)/);
    for (let i = 0; i < statiFilterSplitted.length; i++) {
        let word = statiFilterSplitted[i];
        if (word.includes(":")) {
            word = word.replace(/\'+|\(+|\)+/g, "");
            const prefix = word.split(":")[0];
            if (abbreviationList.includes(prefix) == false) {
                return false;
            }
        }
    }*/
    return true;

}
function geofilterValidator(geoFilterUnitIsUri: boolean, geoFilter: IGeoCircle | IGeoPolygon, prefixList: IPrefix[] | undefined) {
    const geoFilterCircle = geoFilter as IGeoCircle;
    const geoFilterPolygon = geoFilter as IGeoPolygon;
    if (geoFilterCircle.center != null && geoFilterCircle.radius != null && geoFilterCircle.center.latitude != null &&
        geoFilterCircle.center.longitude != null && geoFilterCircle.radius.value != null && geoFilterCircle.radius.unit != null &&
        geoFilterCircle.radius.unit != "" && (!geoFilterUnitIsUri || validateUnit(geoFilterCircle.radius.unit, prefixList))) {
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
    if (!unit) return false;
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
        for (let i = 0; i < prefixList.length; i++) {
            abbreviationList.push(prefixList[i].abbreviation);
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

