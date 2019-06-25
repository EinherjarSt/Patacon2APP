import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { AutocompleteValidOption } from './register-dispatch.custom.validators';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DriversService } from '../../../../services/drivers.service';
import { TrucksService } from '../../../../services/trucks.service';
import { Driver } from '../../../../model-classes/driver';
import { Dispatch } from '../../../../model-classes/dispatch';
import * as moment from 'moment';
import { Truck } from 'src/app/model-classes/truck';

import { Inject } from '@angular/core';

@Component({
  selector: 'register-dispatch',
  templateUrl: './register-dispatch.component.html',
  styleUrls: ['./register-dispatch.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class RegisterDispatchComponent implements OnInit {

  title: String;
  isDriverListDataLoading: boolean;
  isTruckListDataLoading: boolean;

  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<RegisterDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService,
    private _driversService: DriversService, private _trucksService: TrucksService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = "Registrar despacho";
  }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

  truckOptions: Truck[];
  truckFilteredOptions: Observable<Truck[]>;



  registerDispatchForm: FormGroup = this._formBuilder.group({
    id: [-1],
    driverReference: ['', [Validators.required, AutocompleteValidOption]],
    truckReference: ['', [Validators.required, AutocompleteValidOption]],
    planificationReference: [],
    shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    arrivalAtVineyardDate: ['', [Validators.required]],
    arrivalAtVineyardTime: ['', [Validators.required]],
    arrivalAtPataconDate: ['', [Validators.required]],
    arrivalAtPataconTime: ['', [Validators.required]],
    status: ['Pendiente'],
    containerType: ['BINS']

  });


  



  ngOnInit() {
    this.setFormDefaultValues();
    this.getDriverOptions();
    this.getTruckOptions();

  }


  setFormDefaultValues() {
    this.registerDispatchForm.patchValue({
      planificationReference: this.data.planificationId
    });
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

  setDriverListFormControlFilteringCapabilities() {
    this.driverFilteredOptions = this.registerDispatchForm.get('driverReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDriverOptions(value))
      );
  }

  private _filterDriverOptions(value): Driver[] {
    var filterValue: string;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    else {
      filterValue = '';
    }

    return this.driverOptions.filter(driverOption => this.driverToDisplayableString(driverOption).toLowerCase().includes(filterValue));
  }


  driverToDisplayableString(driver: Driver): string {
    return driver ? driver.name + ' ' + driver.surname + ' ' + driver.surname2 + ' / ' + driver.run : '';
  }

  getTruckOptions() {
    this.isTruckListDataLoading = true;
    this._trucksService.getAllTrucks().subscribe({
      next: (trucks) => {
        this.truckOptions = trucks;
        this.setTruckAutocompleteFilteringCapabilities();
        this.isTruckListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setTruckAutocompleteFilteringCapabilities() {
    this.truckFilteredOptions = this.registerDispatchForm.get('truckReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTruckOptions(value))
      );
  }

  private _filterTruckOptions(value): Truck[] {
    var filterValue: string;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    else {
      filterValue = '';
    }

    return this.truckOptions.filter(truckOption => this.truckToDisplayableString(truckOption).toLowerCase().includes(filterValue));
  }


  truckToDisplayableString(truck: Truck): string {
    return truck ?  truck.licencePlate + ' / ' + truck.maxLoad + 'Kg': '';
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
  
  
  setDriverAutocompleteValue() {
    let driverRut = this.registerDispatchForm.value.truckReference.ref_driver;
    let autocompleteValue =  {driverReference: this.findDriverOption(driverRut)};
    this.registerDispatchForm.patchValue(autocompleteValue);
  }

  findDriverOption(driverRut) {
    return this.driverOptions.find(driverOption => driverOption.run == driverRut);
  }

  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido registrado.', 'Cerrar', {
      duration: 2000,
    });
  }

  onCloseSubmit() {
    this.dialogRef.close({ confirmed: true });

  }

  onCloseCancel() {
    this.dialogRef.close({ confirmed: false });
  }



}


