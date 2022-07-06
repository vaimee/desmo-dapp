import ISource from "../model/ISource";
import IQueryParser from "./IQueryParser";

export default interface IDirectoriesCollector {

    collectDirs(
        sources: Array<string>,
        parser: IQueryParser,
        cb: (resolvedSources: Map<string, Array<ISource>>) => void
    ): void

}