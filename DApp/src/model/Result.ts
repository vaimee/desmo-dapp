import EncoderManual from "../component/encoder/encoderManual";
import Types from "../const/Types";
import ISourceValues from "./ISourceValues";


function getPrecision(a: number): number {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
}

export default class Result {

    value: string;
    type: string;
    sources: Array<{ reward: number, sourceIndex: number }>;

    constructor(value: string, type: string, sources: Array<ISourceValues>) {
        this.value = value;
        this.type = type;
        this.sources = new Array<{ reward: number, sourceIndex: number }>();
        for (var s in sources) {
            const score = sources[s].getSource().getScore();
            const index = sources[s].getSource().getIndex();
            this.sources.push({ reward: score, sourceIndex: index });
        }
    }

    getValue(): string {
        return this.value;
    }

    getType(): string {
        return this.type;
    }


    getEncodedValue(): string {
        //###########################Econde result
        const encoder = new EncoderManual(this.sources);
        if (this.type === Types.TYPE_NUMBER) {
            const num = Number(this.value);
            const precision = getPrecision(num);
            if(precision>0){
                const intvalue = Math.trunc(num * (precision**10));
                return encoder.encodeNumber(intvalue, precision);
            }else{
                return encoder.encodeNumber(num);
            }
        } else if (this.type === Types.TYPE_STRING) {
            return encoder.encodeString(this.value);
        } else if (this.type === Types.TYPE_BOOLEAN) {
            throw new Error("Result.getEncodedValue: NOT IMPLEMENTED YET FOR BOOLEAN");
        } else {
            throw new Error("Result.getEncodedValue: type not found for: " + this.type);
        }
    }

}