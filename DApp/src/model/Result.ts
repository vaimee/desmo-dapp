import IEncoder from "../component/encoder/IEncoder";
import Types from "../const/Types";
import ISourceValues from "./ISourceValues";
import IResult from "./IResult";

function getPrecision(a: number): number {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
}

export default class Result implements IResult {

    value: string;
    type: string;
    sources: Map<number,number>;

    constructor(value: string, type: string, sourcesValues: Array<ISourceValues>) {
        this.value = value;
        this.type = type;
        this.sources = new Map<number,number>();
        for (let s in sourcesValues) {
            const score = sourcesValues[s].getSource().getScore();
            const index = sourcesValues[s].getSource().getIndex();
            if(this.sources.has(index)){
                const _reward = this.sources.get(index);
                if(_reward!==undefined &&  _reward>score){
                    this.sources.set(index,score);
                }
            }else{
                this.sources.set(index,score);
            }
        }
    }

    getValue(): string {
        return this.value;
    }

    getType(): string {
        return this.type;
    }

    getScores(): Map<number,number> {
        return this.sources;
    }

    getEncodedValue(encoder:IEncoder): string {
        //###########################Econde result
        // const _encoder = new EncoderManual(this.sources);
        encoder.setSources(this.sources);
        if (this.type === Types.TYPE_NUMBER) {
            const num = Number(this.value);
            const precision = getPrecision(num);
            if(precision>0){
                const intvalue = Math.trunc(num * (precision**10));
                return encoder.encodeNumber(intvalue, precision);
            }else{
                return encoder.encodeNumber(num,0);
            }
        } else if (this.type === Types.TYPE_STRING) {
            return encoder.encodeString(this.value);
        } else if (this.type === Types.TYPE_BOOLEAN) {
            return encoder.encodeString(this.value.toString());
        } else {
            throw new Error("Result.getEncodedValue: type not found for: " + this.type);
        }
    }

    toString():string{
        return "Value: "+this.value+"; Type: "+ this.type+"; Sources: "+ this.sources.size+".";
    }
}