import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { EstimatedDatesValidator } from './register-dispatch.custom.validators';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DriversService } from '../../../../services/drivers.service';
import { Driver } from '../../../../model-classes/driver';
import { Dispatch } from '../../../../model-classes/dispatch';
import * as moment from 'moment';

@Component({
  selector: 'register-dispatch',
  templateUrl: './register-dispatch.component.html',
  styleUrls: ['./register-dispatch.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    
  ]
})
export class RegisterDispatchComponent implements OnInit {

  title: String;
  isDriverListDataLoading: boolean;

  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<RegisterDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService,
    private _driversService: DriversService) {
    this.title = "Registrar despacho";
  }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

  truckOptions: string[] = ['CL12KAP', 'AX12MP1', '1ASLPMQ',];
  truckFilteredOptions: Observable<string[]>;

  statusOptions: string[] = ['En tránsito a viña', 'Cargando', 'En patio',
    'En tránsito a viña', 'Detenido', 'Terminado'];

  
  
  registerDispatchForm: FormGroup = this._formBuilder.group({
    id: [-1],
    driverReference: ['', [Validators.required]],
    truckReference: ['', [Validators.required]],
    planificationReference: [1, []],
    shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    arrivalAtVineyardDate: ['', [Validators.required]],
    arrivalAtVineyardTime: ['', [Validators.required]],
    arrivalAtPataconDate: ['', [Validators.required]],
    arrivalAtPataconTime: ['', [Validators.required]],
    status: [this.statusOptions[0]],
    containerType: ['BINS']

  });

  getDriverDisplayFunction() {
    return (driver) => { 
      return this.driverToDisplayable(driver); 
    };
  }

  
  driverSearchFunction(driverId: string) {
    return driverId.localeCompare(driverId) == 0;
  }


  driverToDisplayable(driver: Driver) : string {

    return driver ? driver.name + ' ' + driver.surname + ' ' + driver.surname2 + ' / ' + driver.run : ''; 
  }

  

  getDriverOptions() {
    this.isDriverListDataLoading = true;
    this._driversService.getAllDrivers().subscribe({
      next: (drivers) => {
        this.driverOptions = drivers;
        this.setDriverListFormControlFilteringCapabilities();
        this.isDriverListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.getDriverOptions();
    
    this.truckFilteredOptions = this.registerDispatchForm.get('truckReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTrucks(value))
      );
  }

  setDriverListFormControlFilteringCapabilities(){
    this.driverFilteredOptions = this.registerDispatchForm.get('driverReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDriverOptions(value))
      );
  }

  private _filterDriverOptions(value): Driver[] {
    const filterValue = value.toLowerCase();
    return this.driverOptions.filter(option => (option.name + ' ' + option.surname + ' ' + option.surname2).toLowerCase().includes(filterValue));
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

    this.submitData(this._dispatchesService.formValuesToDispatchObject(this.registerDispatchForm.value));
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(dispatchData) {

    this._dispatchesService.registerDispatch(dispatchData).subscribe({
      next: result => {
        console.log(result);
      },
      error: result => { }
    });
  }

  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido registrado.', 'Cerrar', {
      duration: 2000,
    });
  }

  onCloseSubmit() {
    this.dialogRef.close({confirmed: true});

  }

  onCloseCancel() {
    this.dialogRef.close({confirmed: false});
  }



}


