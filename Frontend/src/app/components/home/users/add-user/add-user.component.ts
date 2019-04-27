import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor( public thisDialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onCloseConfirm(){
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
