import IEncoder from "../component/encoder/IEncoder";

export default interface IResult {

    getValue(): string;

    getType(): string;

    getEncodedValue(encoder:IEncoder): string;

}