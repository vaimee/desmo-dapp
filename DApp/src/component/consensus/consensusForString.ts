import StringSourceValues from "../../model/StringSourceValues";
import ScoreStruture from "./ScoreStruture";
import Logger from "../Logger";

const componentName = "ConsensusForString";
export default function consensus(sourcesAndValues: Array<StringSourceValues>): string {

    Logger.getInstance().addLog(componentName,"Using consensus alghoritm for STRINGS");

    const struct = new ScoreStruture();

    for (var x in sourcesAndValues) {
        const td = sourcesAndValues[x].getTemporalDistribution();
        const source = sourcesAndValues[x].getSource();
        if (!source.isPunished()) {
            for (var y in td) {
                struct.push(td[y].value, td[y].date, source)
            }
        }
    }

    if(struct.getSize()<1){
        Logger.getInstance().addLog(componentName,"Impossible to reach consensus code[05]: not enough  valid data.",true);
        throw new Error("Impossible to reach consensus code[05]: not enough  valid data.");
    }
    //get best value
    const ris = struct.orderAndEvaluated();

    //reward soruces
    struct.rewardOtherSource();

    return ris;

}