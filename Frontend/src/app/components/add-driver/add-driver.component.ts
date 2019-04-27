import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    public dialogRef: MatDialogRef<AddDriverComponent>) {}

  ngOnInit() {
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


}
