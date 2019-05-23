import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';

@Component({
  selector: 'app-edit-truck',
  templateUrl: "./edit-truck.component.html",
  styleUrls: ["./edit-truck.component.css"]
})

export class EditTruckComponent implements OnInit {

  editTruckForm = new FormGroup({
    licencePlate: new FormControl(''),
    brand: new FormControl(''),
    model: new FormControl(''),
    year: new FormControl(''),
    maxLoad: new FormControl(''),
    owner: new FormControl(''),
    color: new FormControl('')
  });


  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data, 
    private truckService: TrucksService) { }

  ngOnInit() {
    this.getTruckData();
  }  

  getTruckData() {
    this.truckService.getTruck(this.data.licencePlate).subscribe({
      next: result => {
        this.editTruckForm.get('licencePlate').setValue(result.licencePlate);
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
    let truckData = this.editTruckForm.value;
    console.log(this.editTruckForm.value);
    this.truckService.updateTruck(truckData).subscribe({
      next: result => {
        console.log(result);
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

}