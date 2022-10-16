import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DAYS_PLATES_NO_PERMIT, HORARIES_NO_PERMIT } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PicoPlacaService {

  constructor() {
  }

  isForbiddenDay(day: number, digit: number): boolean {
    let dayObjetc = DAYS_PLATES_NO_PERMIT.find(d => d.day == day);
    // se verifica si ultimo digito de placa tiene restriccion el dia ingresado
    return dayObjetc?.digits.includes(digit)!;
  }

  isForbiddenHour(hour: moment.Moment): boolean {
    let result = false;
    HORARIES_NO_PERMIT.forEach(h => {
      // se verifica si hora esta entre los rangos de horas no permitidos
      if (hour.isBetween(h.start, h.end, undefined, '[]')) {
        result = true;
        return;
      }
    });
    return result;
  }

  buildMessage(plate: string, date: string, time: string, permit: boolean): string {
    return `El vehículo de placa ${plate} ${permit ? 'SI' : 'NO'} PUEDE circular el dia ${date} a las ${time}`
  }

}
