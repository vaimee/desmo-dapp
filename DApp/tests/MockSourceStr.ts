import Source from "../src/model/Source";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default class MockSourceStr extends Source{

    values:Array<(string | null)>;
    actual=-1;
    
    constructor(id:string,index:number,v:Array<(string | null)>){
        super(id,index);
        this.values=v;
    }

    async ask():Promise<string>{
        this.actual++;
        const temp = this.values[this.actual];
        await delay(Math.trunc((Math.random()*500)));
        if(temp===null){
            throw new Error("Not valid value getted by source: " + this.source);
        }else{
            return temp.toString();
        }
    }



    reset(){
        this.actual=-1;
    }

}