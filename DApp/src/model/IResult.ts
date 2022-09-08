import IEncoder from "../component/encoder/IEncoder";

export default interface IResult {

    getValue(): string;

    getType(): "TYPE_NUMBER" | "TYPE_STRING" | "TYPE_BOOLEAN";

    getEncodedValue(encoder:IEncoder): string;

    toString():string;
}