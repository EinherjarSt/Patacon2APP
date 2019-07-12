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
import { AutocompleteValidOption } from '../truck.custom.validators';


@Component({
  selector: 'app-edit-truck',
  templateUrl: "./edit-truck.component.html",
  styleUrls: ["./edit-truck.component.css"]
})

export class EditTruckComponent implements OnInit {

  isDriverListDataLoading: boolean;
  isGpsListDataLoading: boolean;

  editTruckForm = new FormGroup({
    licencePlate: new FormControl('', [Validators.required, (Validators.pattern(/^[A-Z]{2}[-][0-9]{4}|[A-Z]{4}[-][0-9]{2}/))]),
    gpsReference: new FormControl('', AutocompleteValidOption),
    driverReference: new FormControl('', AutocompleteValidOption),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
    maxLoad: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)]),
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
        console.log(result);
        this.editTruckForm.get('licencePlate').setValue(result.licencePlate);
        this.editTruckForm.get('gpsReference').setValue(result.ref_gps);
        this.editTruckForm.get('driverReference').setValue(result.ref_driver);
        this.editTruckForm.get('brand').setValue(result.brand);
        this.editTruckForm.get('model').setValue(result.model);
        this.editTruckForm.get('year').setValue(result.year);
        this.editTruckForm.get('maxLoad').setValue(result.maxLoad);
        this.editTruckForm.get('owner').setValue(result.owner);
        this.editTruckForm.get('color').setValue(result.color);
      },
      error: result => {
      }
    });
  }

  onCloseConfirm() { 
    let truckData = this.editTruckForm.value;
    console.log("onCloseConfirm en editar");
    console.log(truckData);
    this.truckService.updateTruck(truckData).subscribe({
      next: result => {
        this.dialogRef.close('Confirm');
      },
      error: result => {
        this.openFailureMessage();
      }
    });
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }

  openFailureMessage() {
    this.snackBar.open("Ha ingresado elementos duplicados (GPS o Chofer).", "Cerrar", {
      duration: 2000, verticalPosition: 'bottom'
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.editTruckForm.get(controlName).hasError(errorName);
  };

}