import IGeoFilter from "../component/IGeoFilter";

export default interface ISource {


    ask(): Promise<string>;
    punish(): void;
    isPunished(): boolean;
    getScore(): number;
    getIndex(): number;
    setScore(s: number):void;
    isGeoValid(geoQuery:IGeoFilter):Promise<boolean>;

}