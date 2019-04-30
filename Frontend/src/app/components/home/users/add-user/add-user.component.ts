import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form : FormGroup;

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor( public thisDialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { 
    this.form = new FormGroup({
      'run': new FormControl(),
      'name': new FormControl(),
      //m: mother / f: father
      'f_surname': new FormControl(),
      'm_surname': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  ngOnInit() {
  }

  onCloseConfirm(){
    // Here add service to send data to backend
    this.thisDialogRef.close('Confirm');

  }

  onCloseCancel(){
    this.thisDialogRef.close('Cancel');


  }


  getErrorMessage() {
    return this.email.hasError('required') ? 'Debe ingresar un valor' :
        this.email.hasError('email') ? 'No es un email válido' :
            '';
  }

}
