import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';
import { Gps } from 'src/app/model-classes/gps';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GpsService } from '../../../../services/gps.service';

@Component({
  selector: "app-add-truck",
  templateUrl: "./add-truck.component.html",
  styleUrls: ["./add-truck.component.css"]
})

export class AddTruckComponent implements OnInit {

  addTruckForm: FormGroup;
  //isGpsListDataLoading: boolean;

  constructor(private snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<AddTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, 
    private truckService: TrucksService)
  { 
    this.addTruckForm = new FormGroup({
      licencePlate: new FormControl("",[Validators.required]),
      brand: new FormControl("",[Validators.required]),
      model: new FormControl("",[Validators.required]),
      year: new FormControl("",[Validators.required]),
      maxLoad: new FormControl("",[Validators.required]),
      owner: new FormControl("",[Validators.required]),
      color: new FormControl("",[Validators.required])
    });
  }
  
  ngOnInit() {
    //this.getGpsOptions();
  }

  /* gpsOptions: Gps[];
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
    this.gpsFilteredOptions = this.addTruckForm.get('gpsReference').valueChanges
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

    return this.gpsOptions.filter(gpsOption => this.GpsToDisplayableString(gpsOption).toLowerCase().includes(filterValue));
  }


  GpsToDisplayableString(gps: Gps): string {
    return gps ?  gps.imei : '';
  } */

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
    this.truckService.createTruck(newTruck).subscribe(
      response => {
        console.log("Success", response);
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