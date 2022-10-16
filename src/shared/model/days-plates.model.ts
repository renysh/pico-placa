export class DaysPlates {
    day:number;
    dayName:string;
    digits:number[]; 
    constructor(day:number, dayName:string, digits:number[]) {
        this.day=day;
        this.dayName = dayName;
        this.digits = digits;
    }
}