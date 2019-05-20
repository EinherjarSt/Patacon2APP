import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Producer } from 'src/app/model-classes/producer';
import { Location } from 'src/app/model-classes/location';

@Component({
  selector: 'app-update-producer',
  templateUrl: './update-producer.component.html',
  styleUrls: ['./update-producer.component.css']
})
export class UpdateProducerComponent implements OnInit {

  name: string;
  rut: string;
  locations : Location[] = new Array();

  producerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateProducerComponent>, private producersService: ProducersService,
     @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder) {

      this.producerForm = this.fb.group({
        name: new FormControl(''),
        rut: new FormControl(''),
        locations: this.fb.array([])
      });
  }

  ngOnInit(){
    this.getProducerData();
  }

  getProducerData(){
    this.producersService.getProducer(this.data).subscribe({
      next: result => {
        this.name = result.name;
        this.rut = result.rut;
        
        for(let item of result.locations){
          this.locations.push(item);
        }

        const loc_form = this.producerForm.get('locations') as FormArray;

        this.producerForm.get('name').setValue(this.name);
        this.producerForm.get('rut').setValue(this.rut);

        for(let location of this.locations){
          loc_form.push(this.fb.group({
            id_location :location.id_location,
            ref_productor: location.ref_producer,
            address: new FormControl(location.address),
            latitude: new FormControl(location.latitude),
            longitude: new FormControl(location.longitude),
            manager: new FormControl(location.manager),
            managerPhoneNumber: new FormControl(location.managerPhoneNumber)
          }));
        }
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

    console.log(this.producerForm.value.locations);
    this.producersService.modifyProducer(producerData).subscribe({
      next: result => {
        this.dialogRef.close();
      },
      error: result => {
        console.log("error");
      }
    });

    for(let location of this.producerForm.value.locations){
      this.producersService.modifyLocation(location).subscribe({
        next: result => {
          this.dialogRef.close();
        },
        error: result => {
          console.log("error");
        }
      });
    }
  }
}
