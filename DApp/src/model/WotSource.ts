// import Conf from "../const/Config";
import ISource from "./ISource";
import { ConsumedThing } from "wot-typescript-definitions";
import Config from "../const/Config";
import IGeoFilter from "../component/IGeoFilter";

const componentName = "WotSource";
export default class WotSource implements ISource {

    index: number;
    thing: ConsumedThing;
    punished: boolean;
    score: number;
    propertyName: string;

    constructor(thing: ConsumedThing, prop: string, index: number) {
        this.thing = thing;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3;
        this.propertyName = prop;
    }



    async ask(): Promise<string> {
        //console.log("START"); //ok
        try {
            const reader = await this.thing.readProperty(this.propertyName);
            const ris = await reader.value();
            console.log(componentName, "Ask for a value, response: " + ris);

            if (ris === null) {
                console.log(componentName, "Not valid value getted by source: " + this.index, true);
                throw new Error("Not valid value getted by source: " + this.index);
            }
            return (ris).toString();
        } catch (err) {
            console.log(componentName, "Error on ask: " + err, true);
            throw new Error("Error on ask: " + err);
        }

    }

    async isGeoValid(geo:IGeoFilter):Promise<boolean>{
        try {
            let lat =null;
            let long =null;
            let alt =null;
            try{
                const readerLat = await this.thing.readProperty(Config.LATITUDE_PROPS_NAME);
                lat = await readerLat.value();
                const readerLong = await this.thing.readProperty(Config.LONGITUDE_PROPS_NAME);
                long = await readerLong.value();
                console.log(componentName, "isGeoValid, response: lat["+lat+"] lon["+long+"]");
            }catch(err){
                console.log(componentName, "isGeoValid, lat long not available.");
            }
            try{
                const readerAlt = await this.thing.readProperty(Config.ALTITUDE_PROPS_NAME);
                alt = await readerAlt.value();
                console.log(componentName, "isGeoValid, response: alt["+alt+"]");
            }catch(err){    
                console.log(componentName, "isGeoValid, altitude not available.");
            }
            if(lat!==null){
                lat= Number(lat);
            }
            if(long!==null){
                long= Number(long);
            }
            if(alt!==null){
                alt= Number(alt);
            }
            return geo.isInside(lat,long,alt);
        } catch (err) {
            console.log(componentName, "Error on ask: " + err, true);
            throw new Error("Error on ask: " + err);
        }
    }

    punish(): void {
        this.punished = true;
        this.score = 0;
    }

    setScore(s: number): void {
        if (!this.punished && this.score > s) {
            this.score = s;
        }
    }

    getScore(): number {
        return this.score;
    }

    isPunished(): boolean {
        return this.punished;
    }

    getIndex(): number {
        return this.index;
    }

}