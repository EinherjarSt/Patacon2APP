import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent implements OnInit {

  producerForm = new FormGroup({
    name: new FormControl(''),
    rut: new FormControl(''),
    manager: new FormControl(''),
    location: new FormControl(''),
    telephone: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.producerForm.value);
    this.dialogRef.close();
  }

}
