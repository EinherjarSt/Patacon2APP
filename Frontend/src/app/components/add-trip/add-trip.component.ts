import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";

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

  close() {
    this.dialogRef.close();
  }

}
