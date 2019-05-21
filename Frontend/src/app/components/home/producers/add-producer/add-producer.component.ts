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


  producerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/)]),
    manager: new FormControl(''),
    telephone: new FormControl('')
  });


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

    locations.push(this.fb.group({
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
