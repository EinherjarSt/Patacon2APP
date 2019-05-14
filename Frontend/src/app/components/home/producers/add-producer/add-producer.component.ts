import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent implements OnInit {

  producerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>, 
    private producersService: ProducersService,
    private fb: FormBuilder) { 

      this.producerForm = this.fb.group({
        name: new FormControl(''),
        rut: new FormControl(''),
        locations: this.fb.array([])
      });
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    let producerData = this.producerForm.value;

    this.producersService.addProducer(producerData).subscribe({
      next: result => {
        console.log("El productor se agregó correctamente");
      },
      error: result => {
        console.log("error");
      }
    });

    for(let location of producerData.locations){
      this.producersService.addLocation(producerData.rut ,location).subscribe({
        next: result => {
          this.dialogRef.close();
        },
        error: result =>{
          console.log("error");
        }
      });
    }
  }

  addLocation(){
    const locations = this.producerForm.get('locations') as FormArray;

    locations.push(this.fb.group({
      address: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      manager: new FormControl(''),
      phoneNumber: new FormControl('')
    }));
  }

}
