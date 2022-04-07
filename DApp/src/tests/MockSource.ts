import Source from "../model/Source";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export default class MockSource extends Source{

    values:Array<(number | null)>;
    actual=-1;
    
    constructor(id:string,index:number,v:Array<(number | null)>){
        super(id,index);
        this.values=v;
    }

    async ask():Promise<string>{
        this.actual++;
        const temp = this.values[this.actual];
        await delay(Math.trunc((Math.random()*500)));
        if(temp===null){
            return "null";
        }else{
            return temp.toString();
        }
    }



    reset(){
        this.actual=-1;
    }

}