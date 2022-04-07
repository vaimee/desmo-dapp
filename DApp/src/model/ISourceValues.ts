import ISource from "./ISource";

export default interface SourceValues {

    addTemporalValue():Promise<boolean>;
    getSource():ISource;    
    toInfoString():string;
    toString():string;
    getInfo():{};
    
}