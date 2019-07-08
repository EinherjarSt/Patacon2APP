import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatStepperModule } from '@angular/material';
import { ResetMailDialogModule } from './reset-password/reset-mail-dialog/reset-mail-dialog.module';
import { ResetMailDialogComponent } from './reset-password/reset-mail-dialog/reset-mail-dialog.component';
import { ResetCodeDialogModule } from './reset-password/reset-code-dialog/reset-code-dialog.module';
import { ResetCodeDialogComponent } from './reset-password/reset-code-dialog/reset-code-dialog.component';
import { ResetPasswordDialogModule } from './reset-password/reset-password-dialog/reset-password-dialog.module';
import { ResetPasswordDialogComponent } from './reset-password/reset-password-dialog/reset-password-dialog.component';


@NgModule({
  exports: [
    CdkStepperModule,
  ],
  declarations: [
    LoginViewComponent,
    ResetPasswordComponent,
    //ResetPassword2Component
  ],
  entryComponents: [
    ResetMailDialogComponent,
    ResetCodeDialogComponent,
    ResetPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ResetMailDialogModule,
    ResetCodeDialogModule,
    ResetPasswordDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatStepperModule
  ]
})
export class LoginModule { }
