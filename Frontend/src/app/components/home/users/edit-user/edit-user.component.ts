import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  run: string;
  name: string;
  surname: string;
  surname2: string;
  email: string;
  position: string;
  disabled: boolean;

  userForm = new FormGroup({
    run: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    surname2: new FormControl(''),
    email: new FormControl(''),
    position: new FormControl(''),
    diable: new FormControl('')

  });

  constructor(public dialogRef: MatDialogRef<EditUserComponent>, private userService: UsersService, @Inject(MAT_DIALOG_DATA) private data) { 
    
  }

  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.userService.getUser(this.data).subscribe({
      next: result => {
        this.run = result.run;
        this.name = result.name;
        this.surname = result.surname;
        this.surname2 = result.surname2;
        this.email = result.email;
        this.position = result.position;
        this.disabled = result.disabled;

        this.userForm.get('run').setValue(this.run);
        this.userForm.get('name').setValue(this.name);
        this.userForm.get('surname').setValue(this.surname);
        this.userForm.get('surname2').setValue(this.surname2);
        this.userForm.get('email').setValue(this.email);
        this.userForm.get('position').setValue(this.position);
        this.userForm.get('disable').setValue(this.disabled);

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

  

}
