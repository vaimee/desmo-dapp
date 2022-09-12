import IEncoder from "../component/encoder/IEncoder";
import ISourceValues from "./ISourceValues";
import IResult from "./IResult";
import {ValueType} from "../const/ValueType";


export default class Result implements IResult {

    value: string;
    type: ValueType;
    sources: Map<number,number>;

    constructor(value: string, type: ValueType, sourcesValues: Array<ISourceValues>) {
        this.value = value;
        this.type = type;
        this.sources = new Map<number,number>();
        let allSourcesPunished=true;
        for (let s in sourcesValues) {
            const actualSource = sourcesValues[s].getSource();
            if(!actualSource.isPunished()){
                allSourcesPunished=false;
            }
            const score = actualSource.getScore();
            const index = actualSource.getIndex();
            if(this.sources.has(index)){
                const _reward = this.sources.get(index);
                if(_reward!==undefined &&  _reward>score){
                    this.sources.set(index,score);
                }
            }else{
                this.sources.set(index,score);
            }
        }
        if(allSourcesPunished){
            this.type=ValueType.TYPE_NO_CONSENSUS;
        }
    }

    getValue(): string {
        return this.value;
    }

    getType(): ValueType {
        return this.type;
    }

    getScores(): Map<number,number> {
        return this.sources;
    }

    getEncodedValue(encoder:IEncoder): string {
        //###########################Econde result
        encoder.setSources(this.sources);
        if (this.type === ValueType.TYPE_NUMBER) {
            return encoder.encodeNumber(Number(this.value));
        } else if (this.type === ValueType.TYPE_STRING) {
            return encoder.encodeString(this.value);
        } else if (this.type === ValueType.TYPE_BOOLEAN) {
            return encoder.encodeBoolean(this.value.toString());
        }else if (this.type === ValueType.TYPE_NO_CONSENSUS) {
            return encoder.encodeNoConsensus();
        } else {
            throw new Error("Result.getEncodedValue: type not found for: " + this.type);
        }
    }

    toString():string{
        return "Value: "+this.value+"; Type: "+ this.type+"; Sources: "+ this.sources.size+".";
    }
}