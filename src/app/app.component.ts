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

  title = 'pico-placa';

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
    const resultDay = this.picoPlacaService.isForbiddenDay(date.isoWeekday(), Number(digitNumber));
    let h = moment(this.form.value.time, "HH:mm");
    if (resultDay) {
      const resultTime = this.picoPlacaService.isForbiddenHour(h);
      if (resultTime) {
        this.permit = false;
        this.resultMessage = this.picoPlacaService.buildMessage(plate, dateString , this.form.value.time, false);
      } else {
        this.permit = true;
        this.resultMessage = this.picoPlacaService.buildMessage(plate, dateString, this.form.value.time, true);
      }
    } else {
      this.permit = true;
      this.resultMessage = this.picoPlacaService.buildMessage(plate, dateString, this.form.value.time, true);
    }
  }

  resetForm():void{
    this.showResult = false;
    this.permit = false;
    this.resultMessage = "";
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setErrors(null)
    });
    
  }

}
