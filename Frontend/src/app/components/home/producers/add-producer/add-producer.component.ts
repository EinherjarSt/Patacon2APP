import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import { ProducersService } from 'src/app/services/producers.service';

interface marker {
	lat: string;
	lng: string;
	label?: string;
	draggable: boolean;
}

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

  markers: marker[] = []

  constructor(public dialogRef: MatDialogRef<AddProducerComponent>, 
    private producersService: ProducersService,
    private fb: FormBuilder) { 

      this.producerForm = this.fb.group({
        name: new FormControl('', [Validators.required]),
        rut: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]),
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

    this.markers.push({
      lat: '0',
      lng: '0',
      draggable: true
    });

    locations.push(this.fb.group({
      expanded: this.expanded,
      address: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      manager: new FormControl(''),
      managerPhoneNumber: new FormControl('', Validators.pattern(/^\d{9}$/))
    }));
  }

  deleteLocation(){
    const locations = this.producerForm.get('locations') as FormArray;

    locations.removeAt(locations.length-1);
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.producerForm.get(controlName).hasError(errorName);
  };

  mapClicked(i: any, $event: any) {
    const locations = this.producerForm.get('locations') as FormArray;

    this.markers[i].lat = $event.coords.lat;
    this.markers[i].lng = $event.coords.lng;

    locations.value[i].latitude = $event.coords.lat;
    locations.value[i].longitude = $event.coords.lng;
  }

  public hasErrorLocation = (index: number, controlName: string, errorName: string) => {
    let formArray = this.producerForm.get("locations") as FormArray;
    return formArray.at(index).get(controlName).hasError(errorName);
  };

  checkRun() {
    let run = this.producerForm.get("rut");
    //Despejar Puntos
    var runClean = run.value.replace('.', '');
    // Despejar Guión
    runClean = runClean.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    let body = runClean.slice(0, -1);
    let dv = runClean.slice(-1).toUpperCase();

    // Formatear RUN
    run.setValue(body + '-' + dv);
  }

  checkVerificatorDigit(control: AbstractControl) {
    let run = control;
    if (run.value == "") return null;
    //Despejar Puntos
    var runClean = run.value.replace('.', '');
    // Despejar Guión
    runClean = runClean.replace('-', '');
  
    // Aislar Cuerpo y Dígito Verificador
    let body = runClean.slice(0, -1);
    let dv = runClean.slice(-1).toUpperCase();
  
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
  
    // Para cada dígito del Cuerpo
    for (let i = 1; i <= body.length; i++) {
  
      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * runClean.charAt(body.length - i);
  
      // Sumar al Contador General
      suma = suma + index;
  
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
  
    }
  
    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);
  
    // Casos Especiales (0 y K)
    dv = (dv == 'K') ? 10 : dv;
    dv = (dv == 0) ? 11 : dv;
  
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
      return {verificator : true};
    }
    else null;
  }
}
