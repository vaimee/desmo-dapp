
import Types from "../const/Types";
import IQueryParser from "./IQueryParser";

//##################################WIP
//##################################WIP
//##################################WIP

export default class QueryParser implements IQueryParser {

    query: string;
    valid: boolean;
    askForType: number;

    constructor(query: string) {
        this.query = query;
        this.valid = false;
    }

    parse() {
        this.valid = true;
        this.askForType = 0;
        throw new Error("Not implemented YET");
    }

    isValid(): boolean {
        return this.valid;
    }

    isAskingForNumber(): boolean {
        if (
            this.askForType === Types.POS_FLOAT
            || this.askForType === Types.NEG_FLOAT
            || this.askForType === Types.POS_INTEGER
            || this.askForType === Types.NEG_INTEGER
        ) {
            return true;
        }
        return false;
    }

    isAskingForBoolean(): boolean {
        return  this.askForType === Types.BOOLEAN;
    }


    isAskingForString(): boolean {
        return this.askForType === Types.STRING
    }

    getType():number{
        return this.askForType;
    }

}