import ISource from "../model/ISource";
import IQueryParser from "./IQueryParser";

export default interface IDirectoriesCollector {

    collectDirs(
        sources: Array<number>,
        parser: IQueryParser,
        cb: (resolvedSources: Map<number, Array<ISource>>) => void
    ): void

}