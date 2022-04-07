export default interface ISource {


    ask(): Promise<string>;
    getURL(): string;
    punish(): void;
    isPunished(): boolean;
    getScore(): number;
    getIndex(): number;

}