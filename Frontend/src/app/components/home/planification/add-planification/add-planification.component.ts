import { Component, OnInit, Inject} from '@angular/core';
import { ProducersService } from '../../../../services/producers.service';
import { PlanificationService } from '../../../../services/planification.service';
import { Producer} from '../../../../model-classes/producer';
import { Planification} from '../../../../model-classes/planification';
import { Location} from '../../../../model-classes/location';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialogRef,MAT_DIALOG_DATA } from "@angular/material";
import { NotifierService } from 'angular-notifier';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-planification',
  templateUrl: './add-planification.component.html',
  styleUrls: ['./add-planification.component.css']
})
export class AddPlanificationComponent implements OnInit {

  title:string;
  verifyProducer = false;
  select:number;
  selectedLocation: Location;
  producers :Producer[];
  filteredOptions: Observable<Producer[]>;
  minDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDay());
  private readonly notifier: NotifierService;

  constructor(private dialogRef: MatDialogRef<AddPlanificationComponent>,
    private formBuilder: FormBuilder,
    private producerService: ProducersService, 
    private planificationService: PlanificationService,
    @Inject(MAT_DIALOG_DATA)public data:Planification,
    notifierService: NotifierService) { 
        this.notifier = notifierService;
    }

  varietyOptions: string[] = ['CARIG','TTRO','CHARD','S.B','S.BLANC',"SEMILLON","MER"];
  qualityOptions: string[] = ['Generico', 'Varietal A','Varietal B'];
  locationOptions: Location[];

  registerPlanificationForm: FormGroup = this.formBuilder.group({
    ref_producer: [ '',[Validators.required]],
    ref_location: ['', [Validators.required]],
    kilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    harvestingType: ['MANO'],
    quality: [this.qualityOptions[0]],
    comment: [''],
    grapeVariety: [this.varietyOptions[0]],
    freight: ['CAMILO'],
    date: ['', [Validators.required]],
    containerType: ['BIN']
  });

  verifyProd(){
    
    let producer = this.registerPlanificationForm.controls['ref_producer'].value;
    if(producer.name == null){
      this.registerPlanificationForm.controls.ref_producer.setErrors({
        notListed:true
      });
      return false;}
    if(this.producers!=null){
      for (let i = 0; i < this.producers.length; i++) {
        const element = this.producers[i];
        if(element.rut = producer.rut){
          this.registerPlanificationForm.controls.ref_producer.setErrors(null);
          return true;}
      }
    }
    this.registerPlanificationForm.controls.ref_producer.setErrors({
      notListed:true
    });
    return false;
  }
  getProducers(){
    this.producerService.getProducers().subscribe( data =>{
      this.producers = data;
    },e=>{},()=>{
      this.filteredOptions = this.registerPlanificationForm.get('ref_producer').valueChanges
      .pipe(
        startWith<string | Producer>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.producers)
      );
     });
  }
  ngOnInit() {
    this.getProducers();
    if(this.data !=null){
      console.log(this.data);
      this.title ="Editar";
      const sp = this.data.date.split('-');
      const day = parseInt(sp[0]);
      const month = parseInt(sp[1])-1;
      const year = parseInt(sp[2]);

      this.changeOptions(this.data.ref_producer);
      for (let i = 0; i < this.locationOptions.length; i++) {
        const element = this.locationOptions[i];
        if(element.address == this.data.ref_location.address){
          this.select = i;
        }
      }
      
      this.registerPlanificationForm.setValue({
        ref_producer: this.data.ref_producer, 
        ref_location: this.locationOptions[this.select], 
        kilograms: this.data.kilograms,
        harvestingType: this.data.harvestingType,
        quality: this.data.quality,
        comment: this.data.comment,
        grapeVariety: this.data.grapeVariety,
        freight: this.data.freight,
        date: new Date(year,month,day),
        containerType: this.data.containerType
      });
      
      
    }
    else{
      this.title ="Agregar";
    }
  }

  changeOptions(pr:Producer){
    this.locationOptions = pr.locations;
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
    this.submitData();
    this.onCloseSubmit();
  }

  submitData() {
    if(this.data!=null){
      //EDITAR
      this.planificationService.updatePlanification(this.registerPlanificationForm.value,this.data.planification_id+"").subscribe(
      response =>{ 
        this.notifier.notify('info', 'Planificación Editada con éxito');
        console.log('Success', response)
      }, 
      error => {
        this.notifier.notify('error', 'Error al editar la planificación');
        console.error('Error', error)
      });
    }
    else{
      //AGREGAR
      this.planificationService.createPlanification(this.registerPlanificationForm.value).subscribe(
        response =>{ 
          this.notifier.notify('info', 'Planificación Agregada con éxito');
          console.log('Success', response)
        }, 
        error => {
          this.notifier.notify('error', 'Error al agregar la planificación');
          console.error('Error', error)
        });

    }
  }

  onCloseSubmit() {
    this.dialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }

}
