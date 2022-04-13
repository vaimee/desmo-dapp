import ISource from "./ISource";

export default interface ISourceValues {

    addTemporalValue():Promise<boolean>;
    getSource():ISource;    
    toInfoString():string;
    toString():string;
    getInfo():{};
    
}