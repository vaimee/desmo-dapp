
export default interface IGeoFilter {

    isInside(lat:number|null,lon:number|null,alt:number|null):boolean;
}