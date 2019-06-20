import { Component, OnInit, Inject } from '@angular/core';
import { ProducersService } from 'src/app/services/producers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  locationForm: FormGroup;
  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = 0;
  lng2: number = 0;

  constructor(public dialogRef: MatDialogRef<AddLocationComponent>, private producersService: ProducersService,
    @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder) { 

      this.locationForm = this.fb.group({
        address: new FormControl('', [Validators.required]),
        latitude: new FormControl('0'),
        longitude: new FormControl('0'),
        manager: new FormControl('', [Validators.required]),
        managerPhoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)])
      });
    }

  ngOnInit() {
  }

  onSubmit(){
    let locationData = this.locationForm.value;

    this.producersService.addLocation(this.data, locationData).subscribe({
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
