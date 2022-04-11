

export default interface IQueryParser {


    parse():void;

    isValid(): boolean ;

    isAskingForNumber(): boolean ;

    isAskingForString(): boolean ;

    isAskingForBoolean(): boolean ;

    getType():number;

}