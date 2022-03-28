import {ethers} from "ethers-ts";

export default class Result{

    value: string;
    type: string;
    
    constructor(value:string,type:string){
        this.value=value;
        this.type=type;
    }

    getValue():string{
        return this.value;
    }

    getEncodedValue():string{
        console.log("WIP: Result.getEncodedValue");
        return "";
    }

}