import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  
  title:String;

  constructor(private dialogRef: MatDialogRef<AddTripComponent>) {
    this.title = "Agregar viaje";
   }

  ngOnInit() {
  }

  onCloseConfirm(){
    this.dialogRef.close('Confirm');

  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');


  }

}
