import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GpsService } from 'src/app/services/gps.service';

@Component({
  selector: 'app-add-gps',
  templateUrl: './add-gps.component.html',
  styleUrls: ['./add-gps.component.css']
})
export class AddGpsComponent implements OnInit {
  form: FormGroup;


  constructor(
    public thisDialogRef: MatDialogRef<AddGpsComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private gpsService: GpsService
  ) { 
    this.form = new FormGroup({
      imei: new FormControl("", [Validators.required, Validators.pattern(/^\d{15}$/)]),
      simNumber: new FormControl("", Validators.required),
      brand: new FormControl(""),
      model: new FormControl("")

    });
  }

  ngOnInit() {
  }

  onCloseConfirm() {
    // Here add service to send data to backend
    console.log(this.form);
    console.log(this.form.value);
    let gpsData = this.form.value;
    this.gpsService.createGPS(gpsData).subscribe({
      next: result => {
        console.log(result);
        this.thisDialogRef.close('Confirm');
      },
      error: result => {}
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close("Cancel");
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

}
