import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { Planification } from 'src/app/model-classes/planification';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(
    public dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA)public data:Planification) {}

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
