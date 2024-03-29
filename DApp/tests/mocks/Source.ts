import ISource from "../../src/model/ISource";
import IGeoFilter from "../../src/component/IGeoFilter";

export default class Source implements ISource {

    index: number;
    source: string;
    // cached: number;
    punished: boolean;
    score: number;

    constructor(url: string, index: number) {
        this.source = url;
        this.punished = false;
        this.index = index;
        //start with the max of score
        //because the score can only decrease
        this.score = 3; 
    }

    async isGeoValid(geoQuery: IGeoFilter): Promise<boolean> {
        return true;
    }

    async ask(): Promise<string> {
        //here the code to get the value from the Directory
        if (Math.random() > 0.2) {
            return Math.trunc(Math.random() * 100).toString();
        }
        throw new Error("Not valid value getted by source: " + this.source);
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