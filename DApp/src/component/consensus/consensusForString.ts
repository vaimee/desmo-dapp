import StringSourceValues from "../../model/StringSourceValues";
import ScoreStruture from "./ScoreStruture";

export default function consensus(sourcesAndValues: Array<StringSourceValues>): string {


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

    //get best value
    const ris = struct.orderAndEvaluated();

    //reward soruces
    struct.rewardOtherSource();

    return ris;

}