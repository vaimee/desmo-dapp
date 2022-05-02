// import Conf from "../const/Config";
import ISource from "./ISource";
import { InteractionOutput } from "wot-typescript-definitions";

export default class Source implements ISource {

    index: number;
    reader: InteractionOutput;
    punished: boolean;
    score: number;

    constructor(reader: InteractionOutput, index: number) {
        this.reader = reader;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3; 
    }



    async ask(): Promise<string> {
        console.log("START");
        const ris = await this.reader.value();
        console.log("ask-->",ris);
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