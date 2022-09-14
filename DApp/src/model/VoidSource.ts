import ISource from "./ISource";
import IGeoFilter from "../component/IGeoFilter";

export default class VoidSource implements ISource {

    index: number;
    source: string;
    score:number;

    constructor(url: string, index: number) {
        this.source = url;
        this.index = index;
        this.score=0;//punished as default
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
        return this.score;
    }

    setScore(s: number): void { 
        /*
        the VoidSource score start as 0 as punished one
        can be setted as "1" if the thing is valid but it is not 
        passing some query filter (like geoFilter)
        */
        if(s<2){
            this.score=s;
        }else{
            this.score=1;
        }
    }
    
    punish(): void { }

}