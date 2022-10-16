export class Horary {
    start: moment.Moment; 
    end: moment.Moment;
    constructor(start: moment.Moment, end: moment.Moment) {
        this.start = start;
        this.end = end;
    }
}