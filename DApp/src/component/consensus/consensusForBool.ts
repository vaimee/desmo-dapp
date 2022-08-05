import BoolSourceValues from "../../model/BoolSourceValues";
import ScoreStruture from "./ScoreStruture";
import VoidSource from "../../model/VoidSource";
import Logger from "../Logger";

const componentName = "ConsensusForBool";
export default function consensus(sourcesAndValues: Array<BoolSourceValues>): boolean {

    Logger.getInstance().addLog(componentName,"Using consensus alghoritm for BOOLEAN");

    const struct = new ScoreStruture();

    for (var x in sourcesAndValues) {
        const td = sourcesAndValues[x].getTemporalDistribution();
        const source = sourcesAndValues[x].getSource();
        if (!source.isPunished()) {
            for (var y in td) {
                struct.push(td[y].value.toString(), td[y].date, source)
            }
        }
    }

    //get best value
    const ris = struct.orderAndEvaluated();

    //reward soruces
    struct.rewardOtherSource();

    const tempJustForConvert = new BoolSourceValues(new VoidSource("",0));

    return tempJustForConvert.parse(ris);


}