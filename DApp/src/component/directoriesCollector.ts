
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import Source from "../model/Source";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
import axios from "axios";
//###########GET EXAMPLE
// axios.get(url)
// .then((ris) => {
//     if (ris.status === 200) {
//        ris.data
//     } else {
        
//     }
// })
// .catch(function (error) {
// });

//###########POST EXAMPLE
// axios.post(
//     url,
//     jsonstr,
//     _headers
//   )

const getThingFromDir =function(dir:string,dirIndex:number,parser:IQueryParser,cb:(s:ISource)=>void){
    const jsonpath =parser.getJsonPath();
    console.log("getPrefixList-->",parser.getPrefixList());
    parser.resolvePrefix("qudt:DEG_C");
    // if(jsonpath!==null){
    //     axios.get(dir+"/search/jsonpath?query="+jsonpath)
    //     .then((ris) => {
    //         if (ris.status === 200) {
    //             //console.log(dir+"/search/jsonpath?query="+jsonpath,ris.data);
    //             cb(new VoidSource(dir,dirIndex));
    //         } else {
    //             cb(new VoidSource(dir,dirIndex));
    //         }
    //     })
    //     .catch(function (error) {  
    //         cb(new VoidSource(dir,dirIndex));
    //         console.log(dir+"/search/jsonpath?query="+jsonpath);
    //         console.log('DirectoriesCollector error on Directory index:' + dirIndex + " Error: "+error);
    //     });
    // }else{
    //     console.log('getThingFromDir NOT IMPLEMENTED YET');
    //     cb(new VoidSource(dir,dirIndex));
    // }
}


export function collectDirs(
    sources: Array<number>,
    parser:IQueryParser,
    cb:(resolvedSources:Array<ISource>)=>void
): void {

    //console.log("parser",parser);
    const ris = new Array<ISource>();
    var barrier = 0;
    const count = sources.length;
    const hit=()=>{
        barrier++;
        if(barrier>=count-1){
            cb(ris);
        }
    }
    for (var s in sources) {
        if (Directories[sources[s]] !== undefined) {
            getThingFromDir(Directories[sources[s]],sources[s],parser,(s:ISource)=>{
                ris.push(s);
                hit();
            });
        } else {
            ris.push(new VoidSource(Directories[sources[s]], sources[s]));
            console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
            hit();
        }
    }
}



