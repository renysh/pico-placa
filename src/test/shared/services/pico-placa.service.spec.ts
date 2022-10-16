import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { PicoPlacaService } from '../../../shared/services/pico-placa.service';

describe('PicoPlacaService', () => {
  let service: PicoPlacaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicoPlacaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Service Methods', () =>{
    it('debe verificar si el ultimo digito de la placa no esta permitido', ()=> {
      // Lunes no esta permitido placa 1 ó 2
      expect(service.isForbiddenDay(1, 2)).toBeTrue();
    });

    it('debe verificar si el ultimo digito de la placa esta permitido', ()=> {
      // Lunes esta permitido placa diferente de 1 ó 2
      expect(service.isForbiddenDay(1, 7)).toBeFalse();
    });

    it('debe verificar si la hora esta prohibida, caso mañana', ()=> {
      // 06:00 no esta permitido
      var result = service.isForbiddenHour(moment('06:00', "HH:mm"));
      expect(result).toBeTrue();
    });

    it('debe verificar si la hora no esta prohibida, caso mañana', ()=> {
      // 05:00 no esta permitido
      var result = service.isForbiddenHour(moment('05:00', "HH:mm"));
      expect(result).toBeFalse();
    });

    it('debe verificar si la hora esta prohibida, caso tarde', ()=> {
      // 16:00 no esta permitido
      var result = service.isForbiddenHour(moment('16:00', "HH:mm"));
      expect(result).toBeTrue();
    });

    it('debe verificar si la hora no esta prohibida, caso tarde', ()=> {
      // 22:00 no esta permitido
      var result = service.isForbiddenHour(moment('22:00', "HH:mm"));
      expect(result).toBeFalse();
    });
  });
});
