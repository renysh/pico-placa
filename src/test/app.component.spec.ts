import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app/app.component';

describe('AppComponent', () => {

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });
  
  it('form invalido cuando esta vacio', () => {
    expect(comp.form?.valid).toBeFalsy();
  });

  it('placa input validar vacio', () => {
    let plate = comp.form?.controls['plate'];
    expect(plate?.valid).toBeFalsy();
  });

  it('placa input validar placa valida de acuerdo a patron LCH-0245', () => {
    fixture.detectChanges();
    comp.form?.controls['plate'].setValue('LCH-0245');
    fixture.detectChanges();
    let plate = comp.form?.controls['plate'];
    expect(plate?.valid).toBeTruthy();
  });

  it('placa input validar placa invalida de acuerdo a patron LCH-0245', () => {
    fixture.detectChanges();
    comp.form?.controls['plate'].setValue('LCH-02LK');
    fixture.detectChanges();
    let plate = comp.form?.controls['plate'];
    expect(plate?.valid).toBeFalsy();
  });

  it('date input validar vacio', () => {
    let date = comp.form?.controls['date'];
    expect(date?.valid).toBeFalsy();
  });

  it('time input validar vacio', () => {
    let time = comp.form?.controls['time'];
    expect(time?.valid).toBeFalsy();
  });

  it('boton Resultado inicialmente deshabilitado', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#buttonResult')?.hasAttribute('disabled')).toBeTruthy();
  });

  it('boton Resultado habilitado despues de ingresar info', () => {
    fixture.detectChanges();
    comp.form?.controls['plate'].setValue('LCH-0245');
    comp.form?.controls['date'].setValue('2022-10-15');
    comp.form?.controls['time'].setValue('09:00');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#buttonResult')?.hasAttribute('disabled')).toBeFalsy();
  });

  it('Submit muestra resaultado', () => {
    fixture.detectChanges();
    comp.form?.controls['plate'].setValue('LCH-0245');
    comp.form?.controls['date'].setValue('2022-10-15');
    comp.form?.controls['time'].setValue('09:00');

    fixture.detectChanges();

    comp.submitForm();

    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#messageResult')?.outerHTML).toContain('SI');
  });

});
