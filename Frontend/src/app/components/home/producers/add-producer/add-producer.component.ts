import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';

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
    telephone: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>, private producersService: ProducersService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    let producerData = this.producerForm.value;

    this.producersService.addProducer(producerData).subscribe({
      next: result => {
        this.dialogRef.close();
      },
      error: result => {
        console.log("error");
      }
    });
    
  }

}
