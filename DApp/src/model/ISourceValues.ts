import Source from "./Source";

export default interface SourceValues {

    source: Source;

    addTemporalValue():Promise<boolean>;
    getSource():Source;    
    toInfoString():string;
    toString():string;
    getInfo():{};
    
}