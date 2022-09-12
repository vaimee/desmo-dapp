export default interface IEncoder {

    encodeNumber(numberValue: number): string;

    encodeString(stringValue: String): string;

    encodeBoolean(stringValue: String): string;

    encodeNoConsensus(): string;

    decode(callbackData: string): any;

    setSources(sources:Map<number,number>):void;
}