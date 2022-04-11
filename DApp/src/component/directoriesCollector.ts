
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import Source from "../model/Source";
import VoidSource from "../model/VoidSource";
import IQueryParser from "./IQueryParser";
const axios = require('axios');

export function collectDirs(sources: Array<number>,parser:IQueryParser): Array<ISource> {
    const ris = new Array<ISource>();
    for (var s in sources) {
        if (Directories[sources[s]] !== undefined) {
            //WIP
            /*
            TODO: with the "parser" we need get the Thing url in order to ask the values
            and then use it instead "Directories[sources[s]]" as url for the "Source"
            */

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

            ris.push(new Source(Directories[sources[s]], sources[s]));
        } else {
            ris.push(new VoidSource(Directories[sources[s]], sources[s]));
            console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
        }
    }
    return ris;
}