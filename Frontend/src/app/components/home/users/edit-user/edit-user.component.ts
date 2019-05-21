import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  hide = true;

  form = new FormGroup({
    run: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    surname2: new FormControl('', [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl(''),
    position: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<EditUserComponent>, private userService: UsersService, @Inject(MAT_DIALOG_DATA) private data) { 
    
  }

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.userService.getUser(this.data).subscribe({
      next: result => {
        this.form.get('run').setValue(result.run);
        this.form.get('name').setValue(result.name);
        this.form.get('surname').setValue(result.surname);
        this.form.get('surname2').setValue(result.surname2);
        this.form.get('email').setValue(result.email);
        this.form.get('password').setValue("");
        this.form.get('position').setValue(result.position);

        console.log(result);

        

      },
      error: result => {
        console.log(result);
      }
    });
  }

  onCloseCancel(): void {
    this.dialogRef.close('Cancel');
  }

  onCloseConfirm(){
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    let userData = this.form.value;

    console.log(this.form.value);
    this.userService.updateUser(userData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close('Confirm');
      },
      error: result => {
        console.log("error");
      }
    });
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };
}
