import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
//import { ResetPassword2Component } from './reset-password2/reset-password2.component';
import { MatStepperModule } from '@angular/material';


@NgModule({
  declarations: [
    LoginViewComponent,
    ResetPasswordComponent,
    //ResetPassword2Component
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatStepperModule
  ]
})
export class LoginModule { }
