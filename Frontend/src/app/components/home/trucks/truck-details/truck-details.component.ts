import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';
import { Gps } from 'src/app/model-classes/gps';
import { Driver } from 'src/app/model-classes/driver';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GpsService } from '../../../../services/gps.service';
import { DriversService } from '../../../../services/drivers.service';
import { Truck } from 'src/app/model-classes/truck';
import { AutocompleteValidOption } from '../truck.custom.validators';


@Component({
  selector: 'app-truck-details',
  templateUrl: "./truck-details.component.html",
  styleUrls: ["./truck-details.component.css"]
})

export class TruckDetailsComponent implements OnInit {

  isDriverListDataLoading: boolean;
  isGpsListDataLoading: boolean;
  truckDetailsForm: FormGroup;
  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TruckDetailsComponent>, private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data, private driverService : DriversService, 
    private truckService: TrucksService, private gpsService : GpsService) { }

    

  createForm() {
    this.truckDetailsForm = this._formBuilder.group({
      licencePlate: new FormControl(''),
      gpsReference: new FormControl('', AutocompleteValidOption),
      driverReference: new FormControl('', AutocompleteValidOption),
      brand: new FormControl(''),
      model: new FormControl(''),
      year: new FormControl(''),
      maxLoad: new FormControl(''),
      owner: new FormControl(''),
      color: new FormControl('')
    });
  }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

  gpsOptions: Gps[];
  gpsFilteredOptions: Observable<Gps[]>;

  ngOnInit() {
    this.createForm();
    this.getTruckData();
    this.getDriverOptions();
    this.getGpsOptions();
  }  


  getDriverOptions() {
    this.isDriverListDataLoading = true;
    this.driverService.getAllDrivers().subscribe({
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
    this.driverFilteredOptions = this.truckDetailsForm.get('driverReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterDriverOptions(value))
      );
  }

  private filterDriverOptions(value): Driver[] {
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

  getGpsOptions() {
    this.isGpsListDataLoading = true;
    this.gpsService.getAllGPS().subscribe({
      next: (gps) => {
        this.gpsOptions = gps;
        this.setGpsAutocompleteFilteringCapabilities();
        this.setGpsAutocompleteValue();
        this.isGpsListDataLoading = false;
      },
      error: (err) => {
      }
    });
  }

  setGpsAutocompleteFilteringCapabilities() {
    this.gpsFilteredOptions = this.truckDetailsForm.get('gpsReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterGpsOptions(value))
      );
  }

  private filterGpsOptions(value): Gps[] {
    var filterValue: string;
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    }
    else {
      filterValue = '';
    }

    return this.gpsOptions.filter(gpsOption => this.gpsToDisplayableString(gpsOption).toLowerCase().includes(filterValue));
  }


  gpsToDisplayableString(gps: Gps): string {
    return gps ?  gps.imei: '';
  }

  setDriverAutocompleteValue() {
    this.truckDetailsForm.patchValue({driverReference: this.findDriverOption(this.data.ref_driver)})
  }

  
  setGpsAutocompleteValue() {
    this.truckDetailsForm.patchValue({gpsReference: this.findGpsOption(this.data.ref_gps || '')})
  }

  findGpsOption(gpsId: string) {
    return this.gpsOptions.find(gpsOption => gpsOption.imei == gpsId);
  }

  findDriverOption(driverId: string) {
    return this.driverOptions.find(driverOption => driverOption.run.localeCompare(driverId) == 0)
  }

  getTruckData() {
    this.truckService.getTruck(this.data.licencePlate).subscribe({
      next: result => {
        console.log(result);
        this.truckDetailsForm.get('licencePlate').setValue(result.licencePlate);
        this.truckDetailsForm.get('gpsReference').setValue(result.ref_gps);
        this.truckDetailsForm.get('driverReference').setValue(result.ref_driver);
        this.truckDetailsForm.get('brand').setValue(result.brand);
        this.truckDetailsForm.get('model').setValue(result.model);
        this.truckDetailsForm.get('year').setValue(result.year);
        this.truckDetailsForm.get('maxLoad').setValue(result.maxLoad);
        this.truckDetailsForm.get('owner').setValue(result.owner);
        this.truckDetailsForm.get('color').setValue(result.color);
      },
      error: result => {
      }
    });
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.truckDetailsForm.get(controlName).hasError(errorName);
  };

}