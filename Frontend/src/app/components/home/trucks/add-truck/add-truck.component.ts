import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';
import { Gps } from 'src/app/model-classes/gps';
import { Driver } from 'src/app/model-classes/driver';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GpsService } from '../../../../services/gps.service';
import { DriversService } from '../../../../services/drivers.service';

@Component({
  selector: "app-add-truck",
  templateUrl: "./add-truck.component.html",
  styleUrls: ["./add-truck.component.css"]
})

export class AddTruckComponent implements OnInit {

  addTruckForm: FormGroup;
  isGpsListDataLoading: boolean;
  isDriverListDataLoading: boolean;

  constructor(private snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<AddTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, private driverService : DriversService,
    private truckService: TrucksService, private gpsService : GpsService)
  { 
    this.addTruckForm = new FormGroup({
      licencePlate: new FormControl("",[Validators.required]),
      ref_gps: new FormControl(""),
      ref_driver: new FormControl(""),
      brand: new FormControl("",[Validators.required]),
      model: new FormControl("",[Validators.required]),
      year: new FormControl("",[Validators.required]),
      maxLoad: new FormControl("",[Validators.required]),
      owner: new FormControl("",[Validators.required]),
      color: new FormControl("",[Validators.required])
    });
  }
  
  ngOnInit() {
    this.getGpsOptions();
    this.getDriverOptions();
  }

  gpsOptions: Gps[];
  gpsFilteredOptions: Observable<Gps[]>;

  
  getGpsOptions() {
    this.isGpsListDataLoading = true;
    this.gpsService.getAllGPS().subscribe({
      next: (gps) => {
        this.gpsOptions = gps;
        this.setGpsAutocompleteFilteringCapabilities();
        this.isGpsListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setGpsAutocompleteFilteringCapabilities() {
    this.gpsFilteredOptions = this.addTruckForm.get('ref_gps').valueChanges
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
    return gps ?  gps.imei : '';
  }

  driverOptions: Driver[];
  driverFilteredOptions: Observable<Driver[]>;

    

  getDriverOptions() {
    this.isDriverListDataLoading = true;
    this.driverService.getAllDrivers().subscribe({
      next: (driver) => {
        this.driverOptions = driver;
        this.setDriverAutocompleteFilteringCapabilities();
        this.isDriverListDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setDriverAutocompleteFilteringCapabilities() {
    this.driverFilteredOptions = this.addTruckForm.get('ref_driver').valueChanges
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
    return driver ?  driver.run : '';
  }

  /* onCloseConfirm() {
    // Here add service to send data to backend
    //console.log(this.form);
    //console.log(this.form.value);
    let truckData = this.addTruckForm.value;
    console.log(truckData);
    this.truckService.createTruck(truckData).subscribe({
      next: result => {
        console.log(result);
        this.openSuccessMessage();
        this.thisDialogRef.close('Confirm');
      },
      error: result => {
        this.openFailureMessage();
        console.log(result)
      }
    });
  }  */

  onCloseConfirm() {
    this.thisDialogRef.close("Confirm");
  }

  onFormSubmit() {
    let newTruck = this.addTruckForm.value;
    console.log(newTruck);
    this.truckService.createTruck(newTruck).subscribe(
      response => {
        console.log("Success", response);
        console.log(newTruck);
        this.onCloseConfirm();
        this.openSuccessMessage();
      },
      error => {
        console.error("Error", error);
        this.openFailureMessage();
      }
    );
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  openFailureMessage() {
    this.snackBar.open("Ya hay un camion deshabilitado con esta patente.", "Cerrar", {
      duration: 2000, verticalPosition: 'bottom'
    });
  }

  openSuccessMessage() {
    this.snackBar.open("El camion ha sido registrado.", "Cerrar", {
      duration: 2000, verticalPosition: 'bottom'
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addTruckForm.get(controlName).hasError(errorName);
  };
}