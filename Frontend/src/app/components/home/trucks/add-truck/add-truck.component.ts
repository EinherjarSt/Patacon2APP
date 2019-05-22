import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrucksService } from '../../../../services/trucks.service';

@Component({
  selector: "app-add-truck",
  templateUrl: "./add-truck.component.html",
  styleUrls: ["./add-truck.component.css"]
})

export class AddTruckComponent implements OnInit {

  addTruckForm: FormGroup;

  constructor(private snackBar: MatSnackBar,
    public thisDialogRef: MatDialogRef<AddTruckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, 
    private truckService: TrucksService) 
  { 
    this.addTruckForm = new FormGroup({
      licencePlate: new FormControl("", [Validators.required]),
      brand: new FormControl(""),
      model: new FormControl(""),
      year: new FormControl(""),
      maxLoad: new FormControl(""),
      owner: new FormControl(""),
      color: new FormControl("")
    });
  }

  ngOnInit() {
  }  

  onCloseConfirm() {
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
      error: result => {console.log(result)}
    });
  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  openSuccessMessage() {
    this.snackBar.open("El camion ha sido registrado.", "Cerrar", {
      duration: 2000
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addTruckForm.get(controlName).hasError(errorName);
  };
}