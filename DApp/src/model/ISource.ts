export default interface ISource {


    ask(): Promise<string>;
    punish(): void;
    isPunished(): boolean;
    getScore(): number;
    getIndex(): number;
    setScore(s: number):void;

}