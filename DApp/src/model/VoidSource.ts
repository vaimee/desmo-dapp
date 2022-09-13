import ISource from "./ISource";
import IGeoFilter from "../component/IGeoFilter";

export default class VoidSource implements ISource {

    index: number;
    source: string;

    constructor(url: string, index: number) {
        this.source = url;
        this.index = index;
    }
    
    async isGeoValid(geoQuery: IGeoFilter): Promise<boolean> {
        return false;
    }

    async ask(): Promise<string> {
        throw new Error("This is a VoidSource, will not return values with ask method.");
    }

  
    isPunished(): boolean {
        return true;
    }

    getIndex(): number {
        return this.index;
    }

    getScore(): number {
        return 0;
    }

    setScore(s: number): void { }
    punish(): void { }

}