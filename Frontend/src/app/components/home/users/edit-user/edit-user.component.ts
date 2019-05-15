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

 

  userForm = new FormGroup({
    run: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    surname2: new FormControl(''),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl(''),
    position: new FormControl(''),
    disabled: new FormControl('')

  });

  constructor(public dialogRef: MatDialogRef<EditUserComponent>, private userService: UsersService, @Inject(MAT_DIALOG_DATA) private data) { 
    
  }

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.userService.getUser(this.data).subscribe({
      next: result => {
        this.userForm.get('run').setValue(result.run);
        this.userForm.get('name').setValue(result.name);
        this.userForm.get('surname').setValue(result.surname);
        this.userForm.get('surname2').setValue(result.surname2);
        this.userForm.get('email').setValue(result.email);
        this.userForm.get('password').setValue(result.password);
        this.userForm.get('position').setValue(result.position);

        console.log(result);

        

      },
      error: result => {
        console.log(result);
      }
    });
  }

  onCloseCancel(): void {
    this.dialogRef.close();
  }

  onCloseConfirm(){
    let userData = this.userForm.value;

    console.log(this.userForm.value);
    this.userService.updateUser(userData).subscribe({
      next: result => {
        console.log(result);
        this.dialogRef.close();
      },
      error: result => {
        console.log("error");
      }
    });
    
  }

  getErrorMessage() {
    let email = this.userForm.controls["email"];
    return email.hasError("required")
      ? "Debe ingresar un valor"
      : email.hasError("email")
      ? "No es un email válido"
      : "";
  }

  

}
