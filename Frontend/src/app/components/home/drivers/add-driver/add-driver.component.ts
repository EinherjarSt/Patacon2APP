import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { DriversService } from "../../../../services/drivers.service";

@Component({
  selector: "app-add-driver",
  templateUrl: "./add-driver.component.html",
  styleUrls: ["./add-driver.component.css"]
})
export class AddDriverComponent implements OnInit {
  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDriverComponent>,
    private driverService: DriversService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  registerDriverForm: FormGroup = this.formBuilder.group({
    run: ["", [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]],
    name: ["", [Validators.required]],
    surname: ["", [Validators.required]],
    surname2: ["", [Validators.required]],
    phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]]
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.registerDriverForm.get(controlName).hasError(errorName);
  };

  public hasFormError(errorName: string) {
    return this.registerDriverForm.hasError(errorName);
  }

  onCloseConfirm() {
    this.dialogRef.close("Confirm");
  }

  onCloseCancel() {
    this.dialogRef.close("Cancel");
  }

  onFormSubmit() {
    let newDriver = this.registerDriverForm.value;
    this.driverService.createDriver(newDriver).subscribe(
      response => {
        console.log("Success", response);
        this.onCloseConfirm();
      },
      error => console.error("Error", error)
    );
  }

  checkRun() {
    let run = this.registerDriverForm.get("run");
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
