import IGeoFilter from "./IGeoFilter";
import turf from '@turf/turf'
import Logger from "./Logger";
import {convertLength,circle,polygon,point,pointsWithinPolygon} from '@turf/turf'
const componentName ="GeoFilter";
/*
WARNING AND LIMITATION OF THAT CLASS

This class will not convert the lat and long points to R2
So the figure will not perfect and there will error near 
the longitude border -179 +179
*/

const unitMap =new Map<string,string>();
unitMap.set("KiloM","kilometers");
unitMap.set("M","meters");
unitMap.set("qudt:KiloM","kilometers");
unitMap.set("qudt:M","meters");
unitMap.set("http://qudt.org/schema/qudt/KiloM","kilometers");
unitMap.set("http://qudt.org/schema/qudt/M","meters");

export default class GeoFilter implements IGeoFilter{

    geoFilterQuery:any;
    region:any|null;
    altMin:number;
    altMax:number;
    alt:boolean;
    constructor(geoFilterQuery:any){
        this.geoFilterQuery= geoFilterQuery;
        this.altMin=-Infinity;
        this.altMax=Infinity;
        this.region=null;
        this.alt=false;
        this.buildFilter();
    }

    private buildFilter(){
         //https://www.rfc-editor.org/rfc/rfc7946
        //ALL Geometry Object
        // 3.1.1.  Position  . . . . . . . . . . . . . . . . . . . . . .   7
        // 3.1.2.  Point . . . . . . . . . . . . . . . . . . . . . . . .   8
        // 3.1.3.  MultiPoint  . . . . . . . . . . . . . . . . . . . . .   8
        // 3.1.4.  LineString  . . . . . . . . . . . . . . . . . . . . .   8
        // 3.1.5.  MultiLineString . . . . . . . . . . . . . . . . . . .   8
        // 3.1.6.  Polygon . . . . . . . . . . . . . . . . . . . . . . .   9
        // 3.1.7.  MultiPolygon  . . . . . . . . . . . . . . . . . . . .   9
        // 3.1.8.  GeometryCollection  . . . . . . . . . . . . . . . . .   9
        // 3.1.9.  Antimeridian Cutting  . . . . . . . . . . . . . . . .  10
        // 3.1.10. Uncertainty and Precision . . . . . . . . . . . . . .  11

        //we support only Polygon and cylinder
        if(this.geoFilterQuery.region===undefined){
            this.region=null;
        }else if(this.geoFilterQuery.region?.vertices!==undefined && Array.isArray(this.geoFilterQuery.region?.vertices)){
            if(this.geoFilterQuery.region.vertices.length>2){
                const points = new Array<Array<number>>();
                for(let _point of this.geoFilterQuery.region.vertices){
                    const p = [_point.latitude, _point.longitude];
                    points.push(p);
                }
                //First and last Position are not equivalent
                const _point = this.geoFilterQuery.region.vertices[0];
                const p = [_point.latitude, _point.longitude];
                points.push(p);
                this.region = polygon([points]);
            }else{
                throw new Error("Not valid Polygon, needs at least 2 vertices.");
            }
        }else if(this.geoFilterQuery.region?.center!==undefined && this.geoFilterQuery.region?.radius!==undefined){
            if(
                !isNaN(this.geoFilterQuery.region.center.latitude) &&
                !isNaN(this.geoFilterQuery.region.center.longitude) &&
                !isNaN(this.geoFilterQuery.region.radius.value)
            ){
                const center = [this.geoFilterQuery.region.center.latitude,this.geoFilterQuery.region.center.longitude];
                let radius = this.geoFilterQuery.region.radius.value*2;//seems circle function use diameter not radius
                const unit =  this.geoFilterQuery.region.radius.unit;
                if(unit!==undefined){
                    radius= this.convertUnitToKmForm(radius,unit);
                }
                this.region = circle(center, radius,{steps: radius/10, units: 'kilometers'});
            }else{
                throw new Error("Not valid region.");
            }
        }else{
            throw new Error("Unsupported geoFilterQuery.");
        }

        if(this.geoFilterQuery.altitudeRange===undefined){
            this.region=null;
        }else if(!isNaN(this.geoFilterQuery.altitudeRange.min) && !isNaN(this.geoFilterQuery.altitudeRange.max)){
            const unit = this.geoFilterQuery.altitudeRange.unit;
            this.altMin = this.geoFilterQuery.altitudeRange.min;
            this.altMax = this.geoFilterQuery.altitudeRange.max;
            if(unit!==undefined){
                this.altMin= this.convertUnitToMetersForm(this.altMin,unit);
                this.altMax= this.convertUnitToMetersForm(this.altMax,unit);
            }
            this.alt=true;
        }else{ throw new Error("Not valid altitudeRange."); }
    }

 
    isInside(lat:number|null,lon:number|null,alt:number|null):boolean{
        let okLatLon = false;
        let okAlt = false;
        if(this.region===null){
            okLatLon=true;
        }else if(lon!==null && lat!==null){
            const _point = point([lat,lon]);
            const temp = pointsWithinPolygon(_point, this.region).features;
            okLatLon= temp.includes(_point);
        }
        if(!this.alt || (alt!==null && alt>=this.altMin && alt<=this.altMax)){
            okAlt=true;
        }
        return okLatLon && okAlt;
    }

    /*
        WARNING: 
        in that version of the GeoFilter  support only units
        that are supported from turf
    */
    convertUnitToMetersForm(value:number,unit:string):number{
        let convertedToTurf= unit;
        const temp =unitMap.get(unit);
        if(temp!==undefined){
            convertedToTurf=temp;
        }
        try{

            const dstUnit:turf.Units = "meters";
            if(convertedToTurf==="meters" ||
                convertedToTurf==="millimeters" ||
                convertedToTurf=== "centimeters" ||
                convertedToTurf=== "kilometers" ||
                convertedToTurf=== "acres" ||
                convertedToTurf=== "miles" ||
                convertedToTurf=== "nauticalmiles" ||
                convertedToTurf=== "inches" ||
                convertedToTurf=== "yards" ||
                convertedToTurf=== "feet" 
            ){
               const temp = convertLength(value,convertedToTurf,dstUnit);
                    return temp;
            }else{
                Logger.getInstance().addLog(componentName,"Not valid unit for "+convertedToTurf+" .",true);
                throw new Error("Not valid unit for "+convertedToTurf+" .");
            }
        }catch(err){
            Logger.getInstance().addLog(componentName,"Not valid conversion for "+convertedToTurf+": "+ err,true);
            throw new Error("Not valid conversion for "+convertedToTurf+" .");
        }
    }

    convertUnitToKmForm(value:number,unit:string):number{
        let convertedToTurf= unit;
        const temp =unitMap.get(unit);
        if(temp!==undefined){
            convertedToTurf=temp;
        }
        try{

            const dstUnit:turf.Units = "kilometers";
            if(convertedToTurf==="meters" ||
                convertedToTurf==="millimeters" ||
                convertedToTurf=== "centimeters" ||
                convertedToTurf=== "kilometers" ||
                convertedToTurf=== "acres" ||
                convertedToTurf=== "miles" ||
                convertedToTurf=== "nauticalmiles" ||
                convertedToTurf=== "inches" ||
                convertedToTurf=== "yards" ||
                convertedToTurf=== "feet" 
            ){
               const temp = convertLength(value,convertedToTurf,dstUnit);
                    return temp;
            }else{
                Logger.getInstance().addLog(componentName,"Not valid unit for "+convertedToTurf+" .",true);
                throw new Error("Not valid unit for "+convertedToTurf+" .");
            }
        }catch(err){
            Logger.getInstance().addLog(componentName,"Not valid conversion for "+convertedToTurf+": "+ err,true);
            throw new Error("Not valid conversion for "+convertedToTurf+" .");
        }
    }
}