import * as moment from "moment";
import { DaysPlates } from "./model/days-plates.model";
import { Horary } from "./model/horary.model";

export const DAYS_PLATES_NO_PERMIT = [
    new DaysPlates(1, "Lunes", [1, 2]),
    new DaysPlates(2, "Martes", [3, 4]),
    new DaysPlates(3, "Miercoles", [5, 6]),
    new DaysPlates(4, "Jueves", [7, 8]),
    new DaysPlates(5, "Viernes", [9, 0]),
    new DaysPlates(6, "Sabado", []),
    new DaysPlates(7, "Domingo", []),
];

export const HORARIES_NO_PERMIT =
    [
        new Horary(moment('06:00',"HH:mm"), moment('09:30',"HH:mm")),
        new Horary(moment('16:00',"HH:mm"), moment('21:00',"HH:mm")),
    ];