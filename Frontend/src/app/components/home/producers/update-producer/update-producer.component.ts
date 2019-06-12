import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

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

        this.producerForm.get('name').setValue(this.name);
        this.producerForm.get('rut').setValue(this.rut);
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

    this.producersService.modifyProducer(producerData).subscribe({
      next: result => {
        this.dialogRef.close();
      },
      error: result => {
        console.log("error");
      }
    });
  }

  deleteLocation(id_location){
    this.producersService.deleteLocation(id_location).subscribe({
      next: result =>{
        console.log("Se ha eliminado correctamente la ubicación");
      },
      error: result => {
        console.log("error");
      }
    });
  }

  addLocationForm(){
    const loc_form = this.producerForm.get('locations') as FormArray;

    loc_form.push(this.fb.group({
      new: true,
      id_location :0,
      ref_productor: this.producerForm.get('rut').value,
      address: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      manager: new FormControl(''),
      managerPhoneNumber: new FormControl('')
    }));
  }

  deleteLocationForm(){
    const loc_form = this.producerForm.get('locations') as FormArray;

    if(loc_form.at(loc_form.length-1).value.new == true){
      loc_form.removeAt(loc_form.length-1);
    }
    else{
      console.log("No se puede eliminar el formulario");
    }
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.producerForm.get(controlName).hasError(errorName);
  };

  public hasErrorLocation = (index: number, controlName: string, errorName: string) => {
    let formArray = this.producerForm.get("locations") as FormArray;
    console.log(formArray.at(index))
    return formArray.at(index).get(controlName).hasError(errorName);
  };
}
