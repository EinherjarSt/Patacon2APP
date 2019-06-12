import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';
import { DriversService } from '../../../../services/drivers.service';
import { TrucksService } from '../../../../services/trucks.service';
import { Inject } from '@angular/core';
import { AutocompleteValidOption } from '../register-dispatch/register-dispatch.custom.validators';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Dispatch } from '../../../../model-classes/dispatch';
import { Driver } from '../../../../model-classes/driver';
import { Truck } from 'src/app/model-classes/truck';
import * as moment from 'moment';

@Component({
  selector: 'edit-dispatch',
  templateUrl: './edit-dispatch.component.html',
  styleUrls: ['./edit-dispatch.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class EditDispatchComponent implements OnInit {

  title: String;
  editDispatchForm: FormGroup;
  dispatchData: Dispatch;

  isDriverListDataLoading: boolean;
  isTruckListDataLoading: boolean;

  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<EditDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService, @Inject(MAT_DIALOG_DATA) public data: Dispatch,
    private _driversService: DriversService, private _trucksService: TrucksService) {
    this.title = "Editar despacho";
    this.dispatchData = data;

  }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

  truckOptions: Truck[];
  truckFilteredOptions: Observable<Truck[]>;

  statusOptions: string[] = ['En camino a viña', 'Detenido camino a viña', 'Cargando', 'En camino a Patacon',
    'Detenido camino a Patacon', 'En patio'];


  createForm() {
    this.editDispatchForm = this._formBuilder.group({
      id: [],
      driverReference: ['', [Validators.required, AutocompleteValidOption]],
      truckReference: ['', [Validators.required, AutocompleteValidOption]],
      planificationReference: [],
      shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
      arrivalAtVineyardDate: ['', [Validators.required]],
      arrivalAtVineyardTime: ['', [Validators.required]],
      arrivalAtPataconDate: ['', [Validators.required]],
      arrivalAtPataconTime: ['', [Validators.required]],
      status: [''],
      containerType: ['']

    });
  }


  ngOnInit() {
    this.createForm();
    this.getDriverOptions();
    this.getTruckOptions();
    this.setFormValues(this.dispatchData);
  }

  getDriverOptions() {
    this.isDriverListDataLoading = true;
    this._driversService.getAllDrivers().subscribe({
      next: (drivers) => {
        this.driverOptions = drivers;
        this.setDriverListFormControlFilteringCapabilities();
        this.setDriverAutocompleteValue();
        this.isDriverListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setDriverListFormControlFilteringCapabilities() {
    this.driverFilteredOptions = this.editDispatchForm.get('driverReference').valueChanges
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
        this.setTruckAutocompleteValue();
        this.isTruckListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setTruckAutocompleteFilteringCapabilities() {
    this.truckFilteredOptions = this.editDispatchForm.get('truckReference').valueChanges
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
    return truck ? truck.licencePlate + ' / ' + truck.maxLoad + 'Kg' : '';
  }



  public hasError = (controlName: string, errorName: string) => {
    return this.editDispatchForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.editDispatchForm.hasError(errorName);
  }

  onFormSubmit() {
    this.submitData(this._dispatchesService.formValuesToDispatchObject(this.editDispatchForm.value));
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(dispatchData) {

    this._dispatchesService.editDispatch(dispatchData).subscribe({
      next: result => {
        console.log(result);
      },
      error: result => { }
    });
  }


  getDispatchData(dispatch_id) {
    this._dispatchesService.getDispatchById(dispatch_id).subscribe({
      next: (data: Dispatch) => {
        this.setFormValues(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setFormValues(dispatch: Dispatch) {
    this.editDispatchForm.patchValue({
      id: dispatch.id,
      planificationReference: dispatch.planificationReference,
      shippedKilograms: dispatch.shippedKilograms,
      arrivalAtVineyardDate: moment(dispatch.arrivalAtVineyardDate),
      arrivalAtVineyardTime: dispatch.arrivalAtVineyardTime,
      arrivalAtPataconDate: moment(dispatch.arrivalAtPataconDate),
      arrivalAtPataconTime: dispatch.arrivalAtPataconTime,
      status: dispatch.status,
      containerType: dispatch.containerType
    });
  }

  setDriverAutocompleteValue() {
    this.editDispatchForm.patchValue({ driverReference: this.findDriverOption(this.dispatchData.driverReference) })
  }


  setTruckAutocompleteValue() {
    this.editDispatchForm.patchValue({ truckReference: this.findTruckOption(this.dispatchData.truckReference) })
  }

  findTruckOption(truckId) {
    return this.truckOptions.find(truckOption => truckOption.id_truck == truckId);
  }

  findDriverOption(driverId: string) {
    return this.driverOptions.find(driverOption => driverOption.run.localeCompare(driverId) == 0)
  }

  dispatchObjectToFormData(dispatch) {

    return {

      id: dispatch.id,
      driverReference: dispatch.driverReference,
      truckReference: dispatch.truckReference,
      planificationReference: dispatch.planificationReference,
      shippedKilograms: dispatch.shippedKilograms,
      arrivalAtVineyardDate: moment(dispatch.arrivalAtVineyardDate),
      arrivalAtVineyardTime: dispatch.arrivalAtVineyardTime,
      arrivalAtPataconDate: moment(dispatch.arrivalAtPataconDate),
      arrivalAtPataconTime: dispatch.arrivalAtPataconTime,
      status: dispatch.status,
      containerType: dispatch.containerType
    };
  }



  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido editado.', 'Cerrar', {
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


