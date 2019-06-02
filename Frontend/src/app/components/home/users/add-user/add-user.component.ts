import {
  Component,
  OnInit,
  Inject
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
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
      run: new FormControl("", [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/)]),
      name: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      surname2: new FormControl("", [Validators.required]),
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

  checkRut(rut) {
    console.log(rut);
    //Despejar Puntos
    var valor = rut.value.replace('.', '');
    // Despejar Guión
    valor = valor.replace('-', '');

    // Aislar Cuerpo y Dígito Verificador
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut.value = cuerpo + '-' + dv

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
      return false;
    }

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {

      // Obtener su Producto con el Múltiplo Correspondiente
      let index = multiplo * valor.charAt(cuerpo.length - i);

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
      return false;
    }

    //Si todo sale bien, eliminar errores (decretar que es válido)
  }
}
