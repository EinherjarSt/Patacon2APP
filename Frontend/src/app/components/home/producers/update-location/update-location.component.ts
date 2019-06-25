import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
  locationForm: FormGroup;
  lat: number;
  lng: number;

  constructor(public dialogRef: MatDialogRef<UpdateLocationComponent>, private producersService: ProducersService,
    @Inject(MAT_DIALOG_DATA) private data: any, private fb: FormBuilder) { 

      this.lat = +data.lat;
      this.lng = +data.lng;

      this.locationForm = this.fb.group({
        id_location : data.location,
        ref_productor: new FormControl(''),
        address: new FormControl('', [Validators.required]),
        latitude: new FormControl(''),
        longitude: new FormControl(''),
        manager: new FormControl('', [Validators.required]),
        managerPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)])
      });
    }

  ngOnInit() {
    this.getLocationData();
  }

  getLocationData(){
    this.producersService.getLocation(this.data.location).subscribe({
      next: result => {
        this.locationForm.get('ref_productor').setValue(result.ref_producer);
        this.locationForm.get('address').setValue(result.address);
        this.locationForm.get('latitude').setValue(result.latitude);
        this.locationForm.get('longitude').setValue(result.longitude);
        this.locationForm.get('manager').setValue(result.manager);
        this.locationForm.get('managerPhoneNumber').setValue(result.managerPhoneNumber);
      },
      error: result => {
        console.log(result);
      }
    });
  }

  onSubmit(){
    let locationData = this.locationForm.value;

    this.producersService.modifyLocation(locationData).subscribe({
      next: result => {
        this.dialogRef.close("Confirm");
      },
      error: result => {
        console.log("error");
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  mapClicked($event: any) {
    this.locationForm.get('latitude').setValue($event.coords.lat);
    this.locationForm.get('longitude').setValue($event.coords.lng);
  }

}
