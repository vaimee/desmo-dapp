import StringSourceValues from "../model/StringSourceValues";
import Conf from "../const/Config";

// this is the simplest heuristic function and its result is "0" or "1".
// we can upgrade it with a semantic distance vector with a result range between "0" and "1"
function h(a:string, b:string){
    if(a.trim().toLocaleLowerCase()===b.trim().toLocaleLowerCase()){
        return 1;
    }else{
        return 0;
    }
}

export default function consensus(sourcesAndValues : Array<StringSourceValues>):string{
    
    return "null";
}