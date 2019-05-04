import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MatSnackBar} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DriversService} from '../../../../services/drivers.service';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private snackBar: MatSnackBar,public dialogRef: MatDialogRef<AddDriverComponent>, private driverService : DriversService, 
    private formBuilder: FormBuilder) {}

  
  
  ngOnInit() {
  }
  
  registerDriverForm: FormGroup = this.formBuilder.group({
    run: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastName1: ['', [Validators.required]],
    lastName2: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.registerDriverForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.registerDriverForm.hasError(errorName);
  }

  onCloseConfirm(){
    this.dialogRef.close('Confirm');
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'Debe ingresar un valor' :
        this.email.hasError('email') ? 'No es un email válido' :
            '';
  }
  onFormSubmit() {
    this.submitData(this.registerDriverForm.value);
    this.onCloseSubmit();
    this.openSuccessMessage();

  }
  submitData(data) {
    this.driverService.registerDriver(this.registerDriverForm.value).subscribe(
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
}
