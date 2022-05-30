// import Conf from "../const/Config";
import ISource from "./ISource";
import { ConsumedThing } from "wot-typescript-definitions";

export default class Source implements ISource {

    index: number;
    thing: ConsumedThing;
    punished: boolean;
    score: number;
    propertyName: string;

    constructor(reader: ConsumedThing,prop:string, index: number) {
        this.thing = reader;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3; 
        this.propertyName= prop;
    }



    async ask(): Promise<string> {
        //console.log("START"); //ok
        const reader = await this.thing.readProperty(this.propertyName);
        const ris = await reader.value();
        //console.log("ask-->",ris);//ok
        if(ris===null){
            throw new Error("Not valid value getted by source: " + this.index);
        }
        return (ris).toString();
    }

    punish(): void {
        this.punished = true;
        this.score = 0;
    }

    setScore(s: number): void {
        if (!this.punished && this.score>s) {
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