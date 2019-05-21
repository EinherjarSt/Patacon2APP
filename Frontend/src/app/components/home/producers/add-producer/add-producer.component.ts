import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent implements OnInit {

  producerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/)]),
    manager: new FormControl(''),
    telephone: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>, private producersService: ProducersService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close("Cancel");
  }

  onSubmit(){
    if (this.producerForm.invalid){
      return;
    }
    let producerData = this.producerForm.value;
    this.producersService.addProducer(producerData).subscribe({
      next: result => {
        this.dialogRef.close("Confirm");
      },
      error: result => {
        console.log("error");
      }
    });
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.producerForm.get(controlName).hasError(errorName);
  };

}
