
import ISource from "../../model/ISource";
import VoidSource from "../../model/VoidSource";

type Sample = {
    value: string,
    date: number,
    score: number,
    slotTime: number
    source: ISource,
    valid: boolean
}

const NotValidSample : Sample = {
    value: "",
    date: 0,
    score: 0,
    slotTime: 0,
    source: new VoidSource("", 0),
    valid: false
}

class ScoreStruture {

    list: Array<Sample>;
    best: Sample;

    constructor() {
        this.list = new Array<Sample>();
        this.best = NotValidSample;
    }

    push(value: string, date: number, s: ISource): void {
        this.list.push({
            value: value,
            date: date,
            score: 0,
            slotTime: 0,
            source: s,
            valid: true
        });
    }

    trySetAsBest(s: Sample): void {

        const condiction = (this.best.valid) ||
            (this.best.score < s.score) ||
            (this.best.score === s.score && this.best.slotTime < s.slotTime);

        if (condiction) {
            this.best = s;
        }

    }

    orderAndEvaluated(): string {

        this.list.sort((a, b) => {
            return a.date - b.date;
        });

        var actual: Sample = NotValidSample;
        var first: Sample = NotValidSample;

        for (let x = 0; x < this.list.length; x++) {
            if (actual.valid && this.list[x].value === actual.value) {
                actual.score++;
                this.list[x].score = actual.score;
                this.list[x].slotTime = (this.list[x].date - first.date);
                this.trySetAsBest(this.list[x]);
            } else {
                actual.value = this.list[x].value;
                actual.score = 0;
                actual.valid = true;
                first = this.list[x];
            }
        }

        if (this.best.valid) {
            this.best.source.setScore(3);
            return this.best.value;
        } else {
           throw new Error("No consensus on values achieve.");
        }

    }

    rewardOtherSource(): void {

        if (this.best.valid) {

            for (let x = 0; x < this.list.length; x++) {

                if (
                    this.list[x].source.getIndex() !== this.best.source.getIndex() &&
                    (this.list[x].score * 2) > this.best.score &&
                    this.list[x].value === this.best.value
                ) {
                    this.list[x].source.setScore(2);
                }

            }

        }

    }

}

export default ScoreStruture;