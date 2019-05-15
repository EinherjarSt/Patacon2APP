import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { DriversService } from 'src/app/services/drivers.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {


  driverForm = new FormGroup({
    run: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    surname2: new FormControl(''),
    phoneNumber: new FormControl(''),
    disabled: new FormControl('')

  });

  constructor(public dialogRef: MatDialogRef<EditDriverComponent>, private driverService: DriversService, @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.getDriverData();
  }
  getDriverData() {
    this.driverService.getDriver(this.data).subscribe({
      next: result => {
        this.driverForm.get('run').setValue(result.run);
        this.driverForm.get('name').setValue(result.name);
        this.driverForm.get('surname').setValue(result.surname);
        this.driverForm.get('surname2').setValue(result.surname2);
        this.driverForm.get('phoneNumber').setValue(result.phoneNumber);
        //this.driverForm.get('disabled').setValue(result.disabled);
      },
      error: result => {
        console.log(result);
      }

    });
  }

  onCloseCancel(): void {
    this.dialogRef.close();
  }

  onCloseConfirm(){
    let driverData = this.driverForm.value;

    console.log(this.driverForm.value);
    this.driverService.updateDriver(driverData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close();

      },
      error: result => {
        console.log("error");
      }
    });
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.driverForm.get(controlName).hasError(errorName);
  };

  public hasFormError(errorName: string) {
    return this.driverForm.hasError(errorName);
  }

}
