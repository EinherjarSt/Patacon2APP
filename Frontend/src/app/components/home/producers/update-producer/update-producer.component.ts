import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Producer } from 'src/app/model-classes/producer';

@Component({
  selector: 'app-update-producer',
  templateUrl: './update-producer.component.html',
  styleUrls: ['./update-producer.component.css']
})
export class UpdateProducerComponent implements OnInit {

  name: string;
  rut: string;
  manager: string;
  telephone: string;

  producerForm = new FormGroup({
    name: new FormControl(''),
    rut: new FormControl({value:'', disabled: true}),
    manager: new FormControl(''),
    telephone: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<UpdateProducerComponent>, private producersService: ProducersService, @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit(){
    this.getProducerData();
  }

  getProducerData(){
    this.producersService.getProducer(this.data).subscribe({
      next: result => {
        this.name = result.name;
        this.rut = result.rut;
        this.manager = result.manager;
        this.telephone = result.telephone;

        this.producerForm.get('name').setValue(this.name);
        this.producerForm.get('rut').setValue(this.rut);
        this.producerForm.get('manager').setValue(this.manager);
        this.producerForm.get('telephone').setValue(this.telephone);
      },
      error: result => {
        console.log(result);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    let producerData = this.producerForm.value;

    console.log(this.producerForm.value);
    this.producersService.modifyProducer(producerData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close();
      },
      error: result => {
        console.log("error");
      }
    });
    
  }

}
