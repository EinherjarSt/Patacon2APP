import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../../services/producers.service';
import { PlanificationService } from '../../../../services/planification.service';
import { Producer} from '../../../../model-classes/producer';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar,MatDialogRef } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.css']
})
export class AddPlanificationComponent implements OnInit {


  producers :Producer[];
  filteredOptions: Observable<Producer[]>;

  minDate = new Date(new Date().getFullYear(),new Date().getDay(),new Date().getMonth());

  constructor(private dialogRef: MatDialogRef<AddPlanificationComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, 
    private producerService: ProducersService, 
    private planificationService: PlanificationService) { 
     
    }

  varietyOptions: string[] = ['CARIG','TTRO','CHARD','S.B','S.BLANC',"SEMILLON","MER"];
  qualityOptions: string[] = ['Generico', 'Varietal A','Varietal B'];
  locationOptions: string[];

  registerPlanificationForm: FormGroup = this.formBuilder.group({
    producer: [ '',[Validators.required]],
    location: ['', [Validators.required]],
    kilos: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    harvest: ['MANO'],
    quality: [this.qualityOptions[0]],
    comment: [''],
    variety: [this.varietyOptions[0]],
    freight: ['CAMILO'],
    date: ['', [Validators.required]],
    container: ['BIN']
  });

  getProducers(){
    this.producerService.getData().subscribe( data =>{
      this.producers = data;
    },e=>{},()=>{
      this.filteredOptions = this.registerPlanificationForm.get('producer').valueChanges
      .pipe(
        startWith<string | Producer>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.producers)
      );
     });
  }
  ngOnInit() {
    this.getProducers();
  }

  changeOptions(pr:Producer){
    this.locationOptions = pr.location;
  }
  displayFn(val: Producer) {
    if(val){
      return val.name
    }
    else{
      return val;
    }
  }

  private _filter(name: string): Producer[] {
    const filterValue = name.toLowerCase();

    return this.producers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerPlanificationForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.registerPlanificationForm.hasError(errorName);
  }

  onFormSubmit() {
    this.submitData(this.registerPlanificationForm.value);
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(data) {
    this.planificationService.registerPlanification(this.registerPlanificationForm.value).subscribe(
      response => console.log('Success', response), 
      error => console.error('Error', error));
  }

  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido registrado.', 'Cerrar', {
      duration: 2000,
    });
  }

  onCloseSubmit() {
    this.dialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}