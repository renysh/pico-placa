import * as moment from "moment";

// map [dia, [ultimo digito placa no permitidos]]
export const DAYS_PLATES_NO_PERMIT = new Map([
    [1, [1, 2]],
    [2, [3, 4]],
    [3, [5, 6]],
    [4, [7, 8]],
    [5, [9, 0]],
    [6, []],
    [7, []],
]);

export const HORARIES_NO_PERMIT =
    [
        {
            'start': moment('06:00',"HH:mm"),
            'end': moment('09:30',"HH:mm")
        },
        {
            'start': moment('16:00',"HH:mm"),
            'end': moment('21:00',"HH:mm")
        }
    ];