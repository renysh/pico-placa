import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {DAYS_PLATES_NO_PERMIT, HORARIES_NO_PERMIT} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PicoPlacaService {

  constructor() { 
  }

  isForbiddenDay(day: number, digit: number) : boolean {
    let digits =  DAYS_PLATES_NO_PERMIT.get(day);
    return digits?.includes(digit)!;
  }

  isForbiddenHour(hour: moment.Moment) : boolean {
    let result = false;
    HORARIES_NO_PERMIT.forEach(h=> {
      if(hour.isBetween(h.start, h.end, undefined, '[]'))
      {
        result = true;
        return;
      }
    });
    return result;
  }

  buildMessage(plate: string, date: string, time: string, permit: boolean): string {
    return `La placa ${plate} ${permit ? 'SI' : 'NO'} PUEDE circular el dia ${date} a las ${time}`
  }

}
