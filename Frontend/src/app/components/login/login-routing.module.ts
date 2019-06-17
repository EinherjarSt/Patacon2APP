import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPassword2Component } from './reset-password2/reset-password2.component';

const routes: Routes = [
  {path: '', component: LoginViewComponent},
  {path: 'reset-password' , component: ResetPasswordComponent},
  //{path: 'reset-password2' , component: ResetPassword2Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
