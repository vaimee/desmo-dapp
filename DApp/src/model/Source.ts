import Conf from "../const/Config";

export default class Source{

    // index: number;
    source: string;
    // cached: number;
    punished: boolean;
    
    constructor(url:string){
        this.source=url;
        this.punished=false;
    }

    // isValid():boolean{
    //     if(this.source===null){
    //         return false;
    //     }
    //     if(this.source===null){
    //         return (Date.now()-this.cached)<Conf.DIRECTORY_CACHE_TIMEOUT;
    //     }
    // }

    // refresh(){
    //     //here the code to get the sources from the chain
    //     console.log("WIP: Source.refresh is not implemented yet");
    //     this.source="http:\\localhost:3000";
    //     this.cached=Date.now();
    // }

    async ask():Promise<string>{
        //here the code to get the value from the Directory
        console.log("WIP: Source.ask is not implemented yet");
        if(Math.random()>0.2){
           return Math.trunc(Math.random()*100).toString();
        }
        throw new Error("Not valid number getted by source: "+this.source);
    }

    getURL():string{
       return this.source;
    }

    punish():void{
        this.punished=true;
    }

    isPunished():boolean{
        return this.punished;
    }
}