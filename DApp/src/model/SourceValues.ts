import Source from "./Source";
// import Conf from "../const/Config";

export default class SourceValues<Type>{

    source: Source;
    temporalDistribution:[Type,number];

    constructor(source: Source){
        this.source=source;
    }

}