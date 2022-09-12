import IEncoder from "../component/encoder/IEncoder";

export default interface IResult {

    getValue(): string;

    getType(): "TYPE_NUMBER" | "TYPE_STRING" | "TYPE_BOOLEAN" | "TYPE_NO_CONSENSUS";

    getEncodedValue(encoder:IEncoder): string;

    toString():string;
}