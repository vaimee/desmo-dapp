
import Directories from "../const/Directories";
import ISource from "../model/ISource";
import Source from "../model/Source";
import VoidSource from "../model/VoidSource";

export function collectDirs(sources: Array<number>): Array<ISource> {
    const ris = new Array<ISource>();
    for (var s in sources) {
        if (Directories[sources[s]] !== undefined) {
            ris.push(new Source(Directories[sources[s]], sources[s]));
        } else {
            ris.push(new VoidSource(Directories[sources[s]], sources[s]));
            console.log('DirectoriesCollector miss a Directory for index:' + sources[s]);
        }
    }
    return ris;
}