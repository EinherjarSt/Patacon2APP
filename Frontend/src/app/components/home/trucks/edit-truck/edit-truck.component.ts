import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';
import { AutocompleteValidOption } from '../add-truck/add-truck.custom.validators';
import { Gps } from 'src/app/model-classes/gps';
import { Driver } from 'src/app/model-classes/driver';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GpsService } from '../../../../services/gps.service';
import { DriversService } from '../../../../services/drivers.service';
import { Truck } from 'src/app/model-classes/truck';


@Component({
  selector: 'app-edit-truck',
  templateUrl: "./edit-truck.component.html",
  styleUrls: ["./edit-truck.component.css"]
})

export class EditTruckComponent implements OnInit {

  isDriverListDataLoading: boolean;
  isGpsListDataLoading: boolean;
  //id_truck: string;
  //run: string;
  //imei: string;
  //available: boolean;
  //disabled: boolean;

  editTruckForm = new FormGroup({
    licencePlate: new FormControl('', [Validators.required]),
    gpsReference: new FormControl(''),
    driverReference: new FormControl(''),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    maxLoad: new FormControl('', [Validators.required]),
    owner: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required])
  });

  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTruckComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data, private driverService : DriversService, 
    private truckService: TrucksService, private gpsService : GpsService) { }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

  gpsOptions: Gps[];
  gpsFilteredOptions: Observable<Gps[]>;

  ngOnInit() {
    //this.run = '';
    //this.imei = '';
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
    this.driverFilteredOptions = this.editTruckForm.get('driverReference').valueChanges
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
        console.log(err);
      }
    });
  }

  setGpsAutocompleteFilteringCapabilities() {
    this.gpsFilteredOptions = this.editTruckForm.get('gpsReference').valueChanges
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
    this.editTruckForm.patchValue({driverReference: this.findDriverOption(this.data.ref_driver)})
  }

  
  setGpsAutocompleteValue() {
    this.editTruckForm.patchValue({gpsReference: this.findGpsOption(this.data.ref_gps || '')})
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
        this.editTruckForm.get('licencePlate').setValue(result.licencePlate);
        this.editTruckForm.get('gpsReference').setValue(result.ref_gps);
        this.editTruckForm.get('driverReference').setValue(result.ref_driver);
        this.editTruckForm.get('brand').setValue(result.brand);
        this.editTruckForm.get('model').setValue(result.model);
        this.editTruckForm.get('year').setValue(result.year);
        this.editTruckForm.get('maxLoad').setValue(result.maxLoad);
        this.editTruckForm.get('owner').setValue(result.owner);
        this.editTruckForm.get('color').setValue(result.color);
        /* console.log(result.licencePlate);
        console.log(result.brand);
        console.log(result.model);
        console.log(result.year);
        console.log(result.maxLoad);
        console.log(result.owner);
        console.log(result.color); */
        console.log(result);
      },
      error: result => {
        console.log(result);
      }
    });
  }

  onCloseConfirm() { 
    //console.log('rut: '+this.run);
    let truckData = this.editTruckForm.value;
    console.log(this.editTruckForm.value);
    this.truckService.updateTruck(truckData).subscribe({
      next: result => {
        console.log(result);
        console.log(truckData);
        this.openSuccessMessage();
        this.dialogRef.close('Confirm');
      },
      error: result => {console.log(result)}
    });
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }

  openSuccessMessage() {
    this.snackBar.open("El camion ha sido editado.", "Cerrar", {
      duration: 2000, verticalPosition: 'bottom'
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editTruckForm.get(controlName).hasError(errorName);
  };

}