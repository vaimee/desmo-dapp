"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IQuery_1 = require("../model/IQuery");
const Config_1 = __importDefault(require("../const/Config"));
var jp = require('jsonpath'); //import jp from "jsonpath"; DO NOT WORK :( 
class QueryParser {
    constructor(query) {
        //console.log("QueryParser.query",query);
        this.query = query;
        this.parsedQuery = JSON.parse(this.query);
        this.valid = false;
    }
    parse() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30;
        //The prefix list is optional
        if (((_a = this.parsedQuery) === null || _a === void 0 ? void 0 : _a.prefixList) && ((_c = (_b = this.parsedQuery) === null || _b === void 0 ? void 0 : _b.prefixList) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            for (let prefix of this.parsedQuery.prefixList) {
                if (((_d = prefix.abbreviation) === null || _d === void 0 ? void 0 : _d.trim()) == "" || ((_e = prefix.completeURI) === null || _e === void 0 ? void 0 : _e.trim()) == "") {
                    console.log("Invalid prefix");
                    this.valid = false;
                    return;
                }
            }
        }
        //The property to be read is mandatory
        if (!this.parsedQuery.property) {
            console.log("missing property");
            this.valid = false;
            return;
        }
        if (!((_g = (_f = this.parsedQuery) === null || _f === void 0 ? void 0 : _f.property) === null || _g === void 0 ? void 0 : _g.identifier) || (((_j = (_h = this.parsedQuery) === null || _h === void 0 ? void 0 : _h.property) === null || _j === void 0 ? void 0 : _j.identifier) && ((_l = (_k = this.parsedQuery) === null || _k === void 0 ? void 0 : _k.property) === null || _l === void 0 ? void 0 : _l.identifier.trim()) == "") || (Config_1.default.PROPERTY_IDENTIFIER_IS_URI &&
            !validateUnit(this.parsedQuery.property.identifier, this.parsedQuery.prefixList)) || !((_o = (_m = this.parsedQuery) === null || _m === void 0 ? void 0 : _m.property) === null || _o === void 0 ? void 0 : _o.unit) ||
            (((_q = (_p = this.parsedQuery) === null || _p === void 0 ? void 0 : _p.property) === null || _q === void 0 ? void 0 : _q.unit) &&
                ((_t = (_s = (_r = this.parsedQuery) === null || _r === void 0 ? void 0 : _r.property) === null || _s === void 0 ? void 0 : _s.unit) === null || _t === void 0 ? void 0 : _t.trim()) == "") || (Config_1.default.PROPERTY_UNIT_IS_URI &&
            !validateUnit(this.parsedQuery.property.unit, this.parsedQuery.prefixList)) ||
            ((_v = (_u = this.parsedQuery) === null || _u === void 0 ? void 0 : _u.property) === null || _v === void 0 ? void 0 : _v.datatype) == null) {
            console.log("invalid property");
            this.valid = false;
            return;
        }
        //The static filter is optional
        if (((_w = this.parsedQuery) === null || _w === void 0 ? void 0 : _w.staticFilter) && ((_y = (_x = this.parsedQuery) === null || _x === void 0 ? void 0 : _x.staticFilter) === null || _y === void 0 ? void 0 : _y.trim()) != "") {
            //The static filter must be a valid JSON-path query
            if (!JsonPathValidator(this.parsedQuery.staticFilter, this.parsedQuery.prefixList)) {
                console.log("invalid static filter");
                this.valid = false;
                return;
            }
        }
        //The dynamic filter is optional
        if (this.parsedQuery.dynamicFilter != null && this.parsedQuery.dynamicFilter.trim() != "") {
            //check if the dynamic filter is valid
        }
        //The geo filter is optional
        if (((_z = this.parsedQuery) === null || _z === void 0 ? void 0 : _z.geoFilter) && ((_1 = (_0 = this.parsedQuery) === null || _0 === void 0 ? void 0 : _0.geoFilter) === null || _1 === void 0 ? void 0 : _1.region) && !geofilterValidator(this.parsedQuery.geoFilter.region, this.parsedQuery.prefixList)) {
            console.log("invalid region inside the geo filter");
            this.valid = false;
            return;
        }
        if (((_3 = (_2 = this.parsedQuery) === null || _2 === void 0 ? void 0 : _2.geoFilter) === null || _3 === void 0 ? void 0 : _3.altitudeRange) && (((_6 = (_5 = (_4 = this.parsedQuery) === null || _4 === void 0 ? void 0 : _4.geoFilter) === null || _5 === void 0 ? void 0 : _5.altitudeRange) === null || _6 === void 0 ? void 0 : _6.min) == null || ((_9 = (_8 = (_7 = this.parsedQuery) === null || _7 === void 0 ? void 0 : _7.geoFilter) === null || _8 === void 0 ? void 0 : _8.altitudeRange) === null || _9 === void 0 ? void 0 : _9.max) == null ||
            !((_12 = (_11 = (_10 = this.parsedQuery) === null || _10 === void 0 ? void 0 : _10.geoFilter) === null || _11 === void 0 ? void 0 : _11.altitudeRange) === null || _12 === void 0 ? void 0 : _12.unit) || ((_15 = (_14 = (_13 = this.parsedQuery) === null || _13 === void 0 ? void 0 : _13.geoFilter) === null || _14 === void 0 ? void 0 : _14.altitudeRange) === null || _15 === void 0 ? void 0 : _15.unit.trim()) == "" ||
            (Config_1.default.GEOFILTER_UNIT_IS_URI && !validateUnit(this.parsedQuery.geoFilter.altitudeRange.unit, this.parsedQuery.prefixList)))) {
            console.log("invalid altitude range inside the geo filter");
            this.valid = false;
            return;
        }
        //The time filter is optional
        if (((_16 = this.parsedQuery) === null || _16 === void 0 ? void 0 : _16.timeFilter) && (!((_18 = (_17 = this.parsedQuery) === null || _17 === void 0 ? void 0 : _17.timeFilter) === null || _18 === void 0 ? void 0 : _18.until) || !((_20 = (_19 = this.parsedQuery) === null || _19 === void 0 ? void 0 : _19.timeFilter) === null || _20 === void 0 ? void 0 : _20.interval) ||
            (!((_22 = (_21 = this.parsedQuery) === null || _21 === void 0 ? void 0 : _21.timeFilter) === null || _22 === void 0 ? void 0 : _22.interval) && ((_24 = (_23 = this.parsedQuery) === null || _23 === void 0 ? void 0 : _23.timeFilter) === null || _24 === void 0 ? void 0 : _24.interval.trim()) == "") || !((_26 = (_25 = this.parsedQuery) === null || _25 === void 0 ? void 0 : _25.timeFilter) === null || _26 === void 0 ? void 0 : _26.aggregation) ||
            (!((_28 = (_27 = this.parsedQuery) === null || _27 === void 0 ? void 0 : _27.timeFilter) === null || _28 === void 0 ? void 0 : _28.aggregation) && ((_30 = (_29 = this.parsedQuery) === null || _29 === void 0 ? void 0 : _29.timeFilter) === null || _30 === void 0 ? void 0 : _30.aggregation.trim()) == ""))) {
            console.log("invalid time filter");
            this.valid = false;
            return;
        }
        this.valid = true;
    }
    isValid() {
        return this.valid;
    }
    isAskingForNumber() {
        if (this.parsedQuery.property.datatype === IQuery_1.RequestedDataType.Integer ||
            this.parsedQuery.property.datatype === IQuery_1.RequestedDataType.Decimal) {
            return true;
        }
        return false;
    }
    isAskingForBoolean() {
        return this.parsedQuery.property.datatype === IQuery_1.RequestedDataType.Boolean;
    }
    isAskingForString() {
        return this.parsedQuery.property.datatype === IQuery_1.RequestedDataType.String;
    }
    getType() {
        return this.parsedQuery.property.datatype;
    }
    getJsonPath() {
        if (this.parsedQuery.staticFilter !== undefined && this.parsedQuery.staticFilter !== null && this.parsedQuery.staticFilter.trim() !== "") {
            return this.parsedQuery.staticFilter;
        }
        else {
            return null;
        }
    }
    getPrefixList() {
        const ResultPrefix = [];
        if (this.parsedQuery.prefixList !== undefined && this.parsedQuery.prefixList !== null && this.parsedQuery.prefixList.length > 0) {
            return this.parsedQuery.prefixList;
        }
        else {
            return null;
        }
    }
    getPropertyIdentifier() {
        return this.parsedQuery.property.identifier;
    }
    getPropertyUnit() {
        return this.parsedQuery.property.unit;
    }
    getPropertyDatatype() {
        return this.parsedQuery.property.datatype;
    }
    getDynamicFilter() {
        if (this.parsedQuery.dynamicFilter !== undefined && this.parsedQuery.dynamicFilter !== null && this.parsedQuery.dynamicFilter.trim() !== "") {
            return this.parsedQuery.dynamicFilter;
        }
        else {
            return null;
        }
    }
    getGeoFilterRegion() {
        if (this.parsedQuery.geoFilter !== undefined && this.parsedQuery.geoFilter !== null && this.parsedQuery.geoFilter.region !== undefined && this.parsedQuery.geoFilter.region !== null) {
            return this.parsedQuery.geoFilter.region;
        }
        else {
            return null;
        }
    }
    getGeoFilterAltitudeRange() {
        if (this.parsedQuery.geoFilter !== undefined && this.parsedQuery.geoFilter !== null && this.parsedQuery.geoFilter.altitudeRange !== undefined && this.parsedQuery.geoFilter.altitudeRange !== null) {
            return this.parsedQuery.geoFilter.altitudeRange;
        }
        else {
            return null;
        }
    }
    getTimeFilter() {
        if (this.parsedQuery.timeFilter !== undefined && this.parsedQuery.timeFilter !== null) {
            return this.parsedQuery.timeFilter;
        }
        else {
            return null;
        }
    }
}
exports.default = QueryParser;
function JsonPathValidator(staticFilter, prefixList) {
    staticFilter = staticFilter.trim();
    try {
        const parsedFilter = jp.parse(staticFilter);
        //only filter expression
        if (parsedFilter.length != 2 ||
            parsedFilter[0].expression.type != "root" ||
            parsedFilter[0].expression.value != "$" ||
            parsedFilter[1].expression.type != "filter_expression") {
            return false;
        }
    }
    catch (err) {
        console.log("ERROR HERE !!!", err);
        return false;
    }
    //check prefixes inside the JsonPath
    const abbreviationList = [];
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
    }
    return true;
}
function geofilterValidator(geoFilter, prefixList) {
    const geoFilterCircle = geoFilter;
    const geoFilterPolygon = geoFilter;
    if (geoFilterCircle.center != null && geoFilterCircle.radius != null && geoFilterCircle.center.latitude != null &&
        geoFilterCircle.center.longitude != null && geoFilterCircle.radius.value != null && geoFilterCircle.radius.unit != null &&
        geoFilterCircle.radius.unit != "" && (!Config_1.default.GEOFILTER_UNIT_IS_URI || validateUnit(geoFilterCircle.radius.unit, prefixList))) {
        return true;
    }
    else if (geoFilterPolygon.vertices != null && geoFilterPolygon.vertices != null && geoFilterPolygon.vertices.length > 0) {
        for (let coordinate of geoFilterPolygon.vertices) {
            if (coordinate.latitude == null || coordinate.longitude == null) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function validateUnit(unit, prefixList) {
    if (!unit)
        return false;
    unit = unit.trim();
    // if it's an URL, it's valid
    //check if it is a valid URI
    if (isValidHttpUrl(unit)) {
        return true;
    }
    const slices = unit.split(":");
    if (slices.length != 2) {
        return false;
    }
    const abbreviationList = [];
    if (prefixList !== undefined) {
        for (let i = 0; i < prefixList.length; i++) {
            abbreviationList.push(prefixList[i].abbreviation);
        }
    }
    if (!(abbreviationList.includes(slices[0]))) {
        return false;
    }
    return true;
}
function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
