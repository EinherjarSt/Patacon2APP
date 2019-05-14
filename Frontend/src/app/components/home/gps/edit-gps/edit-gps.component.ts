import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { GpsService } from "src/app/services/gps.service";

@Component({
  selector: "app-edit-gps",
  templateUrl: "./edit-gps.component.html",
  styleUrls: ["./edit-gps.component.css"]
})
export class EditGpsComponent implements OnInit {
  form: FormGroup;

  constructor(
    public thisDialogRef: MatDialogRef<EditGpsComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private gpsService: GpsService
  ) {
    this.form = new FormGroup({
      imei: new FormControl("", Validators.required),
      simNumber: new FormControl("", Validators.required),
      brand: new FormControl(""),
      model: new FormControl("")
    });

    this.gpsService.getGPS(data.imei).subscribe({
      next: gps => {
        this.form.setValue(gps);
      },
      error: err => {
        console.log("Error al editar gps");
        console.log(err);
      }
    });
  }

  ngOnInit() {}

  onCloseConfirm() {
    // Here edit service to send data to backend
    let gpsData = this.form.value;
    this.gpsService.updateGPS(gpsData).subscribe({
      next: result => {
        console.log(result);
        this.thisDialogRef.close("Confirm");
      },
      error: result => {}
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close("Cancel");
  }
}
