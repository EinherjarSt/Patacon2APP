import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model-classes/user';
import { UsersService } from 'src/app/services/users.service';
import {FormGroup,FormControl,Validators, AbstractControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import { NotifierService } from 'angular-notifier';

@Component({
    selector: "app-configuration-view",
    templateUrl: "./configuration-view.component.html",
    styleUrls: ["./configuration-view.component.css"]
  })

export class ConfigurationViewComponent implements OnInit {
  private readonly notifier: NotifierService;
  private userId;
  private user: User;
  btnPassNoVisible = true;
  btnDataNoVisible = true;
  hideOld = true;
  hideNew = true;

    form = new FormGroup({
      run: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      surname2: new FormControl('', [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      position: new FormControl('', [Validators.required]),
      password: new FormControl('')
    });

    passForm = new FormGroup({
      originalPass: new FormControl(''),
      newPass1: new FormControl(''),
      newPass2: new FormControl('', [Validators.required])
    });

    constructor(private route: ActivatedRoute,
        private userService: UsersService,
        notifierService: NotifierService) {
          this.notifier = notifierService;
        }

  ngOnInit() {
    this.user = new User();
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.userId).subscribe({
      next: result => {
        this.form.get('run').setValue(result.run);
        this.form.get('name').setValue(result.name);
        this.form.get('surname').setValue(result.surname);
        this.form.get('surname2').setValue(result.surname2);
        this.form.get('email').setValue(result.email);
        this.form.get('position').setValue(result.position);

        console.log(result);
        this.user =result;
      },
      error: result => {
        console.log(result);

      }
        
    });
  }
  

  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };

  public hasError2 = (controlName: string, errorName: string) => {
    return this.passForm.get(controlName).hasError(errorName);
  };

  onClickPersonalData(){
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
        this.notifier.notify('success', 'Se ha editado su información personal');
      },
      error: result => {
        this.notifier.notify('error', 'Error al editar su información');
      }
    });
  }

  onClickPassword(){
    let pass = this.passForm.controls['originalPass'].value;
    if(pass!=null)
    this.userService.verifyPassword(this.user.run,pass).subscribe(res=>{
      if(!res){
        //WRONG PASSWORD
        this.passForm.controls.originalPass.setErrors({
          badPassword:true
        });
      }
      else{
        //PASSWORD OK
        this.passForm.controls.originalPass.setErrors(null);
        let newPass = this.passForm.controls['newPass2'].value;
        this.userService.updatePassword(this.user.run,newPass).subscribe(response=>{
          this.notifier.notify('success', 'Se ha actualizado la contraseña');          
        },err=>{
          this.notifier.notify('error', 'Error al actualizar contraseña');
        });
      }
    },err=>{
      console.log(err);
    });
  }

  verifyMatch(){
    let pass1 = this.passForm.controls['newPass1'].value;
    let pass2 = this.passForm.controls['newPass2'].value;
    if(pass1!=pass2){
      this.passForm.controls.newPass2.setErrors({
        notMatch:true
      });
      }
    else{
      this.passForm.controls.newPass2.setErrors(null);
    }
  }

  enableCondition(event:any){
    this.btnPassNoVisible = false;
  }
  enableBtnData(event:any){
    this.btnDataNoVisible = false;
  }
}
