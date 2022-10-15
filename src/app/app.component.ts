import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'pico-placa';

  form!: FormGroup;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      plate: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  submitForm(){
    console.log('submit');
    
  }
  
}
