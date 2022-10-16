import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { PicoPlacaService } from 'src/shared/services/pico-placa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form!: FormGroup;

  showResult = false;

  permit = false;

  resultMessage = "";

  constructor(public fb: FormBuilder, private picoPlacaService: PicoPlacaService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      plate: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z]{3}-[0-9]{4}'),
      ])),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    this.showResult = true;
    let date = moment(this.form.value.date, "YYYY-MM-DD");
    let dateString = date.format('dddd D [de] MMMM [del] YYYY');
    let plate: string = this.form.value.plate;
    let digitNumber = plate.slice(-1);
    // se consulta si el ultimo digiot de placa tiene restriccion en el dia seleccionado
    const resultDay = this.picoPlacaService.isForbiddenDay(date.isoWeekday(), Number(digitNumber));
    let hour = moment(this.form.value.time, "HH:mm");

    if (resultDay) {
      // si tiene se verifica hora
      const resultTime = this.picoPlacaService.isForbiddenHour(hour);
      if (resultTime) {
        this.setResult(plate, dateString, this.form.value.time, false);
      } else {
        this.setResult(plate, dateString, this.form.value.time, true);
      }
    } else {
      // si no tiene restriccion el ultimo digito de la placa ya no se verifica hora
      this.setResult(plate, dateString, this.form.value.time, true);
    }
  }

  setResult(plate: string, date: string, time: string, permit: boolean): void {
    this.permit = permit;
    this.resultMessage = this.picoPlacaService.buildMessage(plate, date, time, permit);
  }

  resetForm(): void {
    this.showResult = false;
    this.permit = false;
    this.resultMessage = "";
    this.form.reset();
    // se resetea validaciones
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null)
    });

  }

}
