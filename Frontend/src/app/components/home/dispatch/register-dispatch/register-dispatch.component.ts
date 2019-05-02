import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { EstimatedDatesValidator } from './register-dispatch.custom.validators';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';



@Component({
  selector: 'register-dispatch',
  templateUrl: './register-dispatch.component.html',
  styleUrls: ['./register-dispatch.component.css']
})
export class RegisterDispatchComponent implements OnInit {

  title: String;


  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<RegisterDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService) {
    this.title = "Registrar despacho";
  }

  driverOptions: string[] = ['Por definir', 'Pedro Ruminot', 'Vladimir Putin', 'Nyango Star'];
  driverFilteredOptions: Observable<string[]>;

  truckOptions: string[] = ['CL12KAP', 'AX12MP1', '1ASLPMQ'];
  truckFilteredOptions: Observable<string[]>;

  statusOptions: string[] = ['En tránsito a viña', 'Cargando', 'En patio',
    'En tránsito a viña', 'Detenido', 'Terminado'];



  registerDispatchForm: FormGroup = this._formBuilder.group({
    $key: ['1'],
    driver: ['', [Validators.required]],
    truck: ['', [Validators.required]],
    shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    estimatedArrivalDateAtProducer: ['', [Validators.required]],
    estimatedArrivalTimeAtProducer: ['', [Validators.required]],
    estimatedArrivalDateAtPatacon: ['', [Validators.required]],
    estimatedArrivalTimeAtPatacon: ['', [Validators.required]],
    status: [this.statusOptions[0]],
    container: ['BINS']

  }, { validator: EstimatedDatesValidator });

  ngOnInit() {
    this.driverFilteredOptions = this.registerDispatchForm.get('driver').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDrivers(value))
      );
    this.truckFilteredOptions = this.registerDispatchForm.get('truck').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTrucks(value))
      );
  }

  private _filterDrivers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.driverOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTrucks(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.truckOptions.filter(option => option.toLowerCase().includes(filterValue));
  }



  public hasError = (controlName: string, errorName: string) => {
    return this.registerDispatchForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.registerDispatchForm.hasError(errorName);
  }

  onFormSubmit() {
    this.submitData(this.registerDispatchForm.value);
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(data) {
    this._dispatchesService.registerDispatch(this.registerDispatchForm.value).subscribe(
      response => console.log('Success', response), 
      error => console.error('Error', error));
  }

  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido registrado.', 'Cerrar', {
      duration: 2000,
    });
  }

  onCloseSubmit() {
    this.dialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }



}


