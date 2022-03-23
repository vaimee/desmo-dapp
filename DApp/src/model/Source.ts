import Conf from "../const/Config";

export default class Source{

    index: number;
    source: String;
    cached: number;
    
    constructor(index:number){
        this.index=index;
    }

    isValid():boolean{
        if(this.source===null){
            return false;
        }
        if(this.source===null){
            return (Date.now()-this.cached)<Conf.DIRECTORY_CACHE_TIMEOUT;
        }
    }

    refresh(){
        //here the code to get the sources from the chain
        console.log("WIP: Source.refresh is not implemented yet");
        this.source="http:\\localhost:3000";
        this.cached=Date.now();
    }

}