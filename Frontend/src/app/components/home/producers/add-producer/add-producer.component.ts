import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-add-producer',
  templateUrl: './add-producer.component.html',
  styleUrls: ['./add-producer.component.css']
})
export class AddProducerComponent implements OnInit {
  producerForm: FormGroup;
  expanded = true;
  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = -34.147774;
  lng2: number = -70.741592;

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>, 
    private producersService: ProducersService,
    private fb: FormBuilder) { 

      this.producerForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        rut: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/)]),
        locations: this.fb.array([])
      });
    }

  ngOnInit() {
    //si no quieren que se incluya un formulario al cargar el modal
    //eliminen esta linea de codigo.
    this.addLocation();
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

    if(locations.length > 0){
      this.expanded = false;
    }
    else{
      this.expanded = true;
    }

    locations.push(this.fb.group({
      expanded: this.expanded,
      address: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      manager: new FormControl(''),
      managerPhoneNumber: new FormControl('')
    }));
  }

  deleteLocation(){
    const locations = this.producerForm.get('locations') as FormArray;

    locations.removeAt(locations.length-1);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.producerForm.get(controlName).hasError(errorName);
  };

}
