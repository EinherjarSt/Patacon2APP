import {
  Component,
  OnInit,
  Inject
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import {
  MatDialogRef
} from "@angular/material";
import {
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  UsersService
} from "../../../../services/users.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  hide = true;

  constructor(
    public thisDialogRef: MatDialogRef < AddUserComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private userService: UsersService
  ) {
    this.form = new FormGroup({
      run: new FormControl("", [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/), this.checkVerificatorDigit]),
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      surname2: new FormControl("", [Validators.required]),
      position: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });

  }

  ngOnInit() {}

  onCloseConfirm() {
    // Here add service to send data to backend
    console.log(this.form);
    console.log(this.form.value);
    if (this.form.invalid) {
      ( < any > Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    let userData = this.form.value;
    this.userService.createUser(userData).subscribe({
      next: result => {
        console.log(result);
        this.thisDialogRef.close('Confirm');
      },
      error: result => {}
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close("Cancel");
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

  checkRun() {
    let run = this.form.get("run");
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