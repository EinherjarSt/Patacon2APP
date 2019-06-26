import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { UsersService } from '../../../services/users.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ResetPassword } from '../../../model-classes/reset_password';
import { ResetPasswordService } from '../../../services/resetpassword.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })

export class ResetPasswordComponent implements OnInit {
    isLinear = false;
    getEmailForm: FormGroup;
    getVerCodeAndNewPasswordForm: FormGroup;
    selectedIndex = 0;
    //getNewPasswordForm: FormGroup;

    //resetPasswordForm: FormGroup;

    constructor(private auth:AuthService, private router:Router, 
      private resetPassword:ResetPasswordService, private snackBar: MatSnackBar) { 
        this.getEmailForm = new FormGroup({
          email: new FormControl("", [Validators.required])
        });
        this.getVerCodeAndNewPasswordForm = new FormGroup({
          verCode: new FormControl("", [Validators.required]),
          newPassword: new FormControl("", [Validators.required]),
          newPasswordRepeated: new FormControl("", [Validators.required])
        });
        /*this.getNewPasswordForm = new FormGroup({
          newEmail: new FormControl("")
        });*/
        /* function emailValidator(control: FormControl) {
          let email = control.value;
          if (!this.comprobateIfUserExists()) {
              return {
                email: {email}
              }
            }
          }
          return null; (6)
        } */
      }

    ngOnInit() {
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    backToLogin(){
    //this.auth.logout();
    this.router.navigate(['login']);
    }

    /* goToResetPassword2(){
      //this.auth.logout();
      this.router.navigate(['login/reset-password2']);
      } */

    /* onCloseConfirm() {
      // Here add service to send data to backend
      console.log(this.form);
      console.log(this.form.value);
      if (this.form.invalid) {
        (<any>Object).values(this.form.controls).forEach(control => {
          control.markAsTouched();
        });
        return;
      }
      let email = this.form.email;
      this.userService.createUser(userData).subscribe({
        next: result => {
          console.log(result);
          this.thisDialogRef.close('Confirm');
        },
        error: result => {}
      });
    } */

    /*public hasError = (controlName: string, errorName: string) => {
      return this.getEmailForm.get(controlName).hasError(errorName);
    };*/

    public selectionChange($event?: StepperSelectionEvent): void {
      //debugger;
      console.log('stepper.selectedIndex: ' + this.selectedIndex 
          + '; $event.selectedIndex: ' + $event.selectedIndex);
  
      if ($event.selectedIndex == 0) return; // First step is still selected
  
      this.selectedIndex = $event.selectedIndex;
    }
    public goto(index: number): void {
      console.log('stepper.selectedIndex: ' + this.selectedIndex 
          + '; goto index: ' + index);
      if (index == 0) return; // First step is not selected anymore -ok
      
      this.selectedIndex = index;
    }

    openMailFailureMessage() {
      this.snackBar.open("No hay usuarios registrados con este correo.", "Cerrar", {
        duration: 2000, verticalPosition: 'bottom'
      });
    }

    openCodeFailureMessage() {
      this.snackBar.open("El codigo ingresado no es válido.", "Cerrar", {
        duration: 2000, verticalPosition: 'bottom'
      });
    }

    openPasswordFailureMessage() {
      this.snackBar.open("Las contraseñas ingresadas no coinciden.", "Cerrar", {
        duration: 2000, verticalPosition: 'bottom'
      });
    }

    openSuccessMessage() {
      this.snackBar.open("La contraseña ha sido modificada con éxito.", "Cerrar", {
        duration: 2000, verticalPosition: 'bottom'
      });
    }

    comprobateIfUserExists()
    {
      let email = this.getEmailForm.get("email").value;
      console.log(email);
      this.resetPassword.findUserbyEmail(email).subscribe({
        next: result => {
          console.log(result);
          this.goto(1);
          this.generateCode(email);
        },
        error: result => {
          this.openMailFailureMessage(); 
          console.log("No existen usuarios registrados con el correo ingresado");
        }
      });
    }

    /*comprobateIfVerificationCodeExists()
    {
      let verification_code = this.getVerCodeAndNewPasswordForm.get("verCode").value;
      let password = this.getVerCodeAndNewPasswordForm.get("newPassword").value;
      let repeatedPassword = this.getVerCodeAndNewPasswordForm.get("newPasswordRepeated").value;
      console.log(verification_code);
      this.resetPassword.findVerificationCode(verification_code).subscribe({
        next: result => {
          console.log(result);
          if (password = repeatedPassword)
          {
            //setTimeout(this.openSuccessMessage(), 3000);
            setTimeout( () => { this.openSuccessMessage(); }, 3000 );
            this.changePassword(verification_code, password);
          }
          else
          {
            this.openPasswordFailureMessage();
          }
        },
        error: result => {
          this.openCodeFailureMessage(); 
          console.log("Codigo de Verificacion no válido");
        }
      });
    }*/
  
    generateCode(email: string)
    {
      //let email = this.getEmailForm.get("email").value;
      //console.log("email");
      //console.log(email);
      this.resetPassword.createCode(email).subscribe({
        next: result => {
          console.log(result);
          console.log("codigo se ha generado");
          //return true;
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {
          console.log("error");
        }
      });
    }

    changePassword()
    {
      let verification_code = this.getVerCodeAndNewPasswordForm.get("verCode").value;
      let password = this.getVerCodeAndNewPasswordForm.get("newPassword").value;
      let repeatedPassword = this.getVerCodeAndNewPasswordForm.get("newPasswordRepeated").value;
      //console.log("email");
      console.log("Datos en componente");
      console.log(verification_code);
      console.log(password);
      this.resetPassword.findVerificationCode(verification_code).subscribe({
        next: result => {
          console.log(result);
          if (password == repeatedPassword)
          {
            this.resetPassword.changePassword(verification_code, password).subscribe({
              next: result => {
                console.log(result);
                console.log("codigo se ha generado");
                setTimeout( () => { this.openSuccessMessage(); }, 3000 );
                this.router.navigate(['login']);
                //this.thisDialogRef.close('Confirm');
              },
              error: result => {
                console.log("error");
                this.openPasswordFailureMessage();
              }
            });
          }
          else
          {
            this.openPasswordFailureMessage();
          }
        },
        error: result => {
          this.openCodeFailureMessage(); 
          console.log("Codigo de Verificacion no válido");
        }
      });
    }

    /*
    funcional completo (no verifica codigo de verificacion)
    changePassword()
    {
      let verification_code = this.getVerCodeAndNewPasswordForm.get("verCode").value;
      let password = this.getVerCodeAndNewPasswordForm.get("newPassword").value;
      let repeatedPassword = this.getVerCodeAndNewPasswordForm.get("newPasswordRepeated").value;
      //console.log("email");
      console.log("Datos en componente");
      console.log(verification_code);
      console.log(password);
      if (password == repeatedPassword)
      {
        this.resetPassword.changePassword(verification_code, password).subscribe({
          next: result => {
            console.log(result);
            console.log("codigo se ha generado");
            this.router.navigate(['login']);
            //this.thisDialogRef.close('Confirm');
          },
          error: result => {
            console.log("error");
            this.openPasswordFailureMessage();
          }
        });
      }
      else
      {
        this.openPasswordFailureMessage();
      }
      
    }/*

    /*changePassword(verification_code: string, password: string)
    {
      //console.log("email");
      console.log("Datos en componente");
      console.log(verification_code);
      console.log(password);
      this.resetPassword.changePassword(verification_code, password).subscribe({
        next: result => {
          console.log(result);
          console.log("codigo se ha generado");
          this.router.navigate(['login']);
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {
          console.log("error");
        }
      });
    }*/

    /* insertNewPassword()
    {
      let ver_code = this.getVerCodeForm.get("verCode").value;
      console.log("verCode");
      let password = this.getVerCodeForm.get("password").value;
      this.resetPassword.verificateCode(ver_code, password).subscribe({
        next: result => {
          console.log(result);
          console.log("codigo asociado con un mail");
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {
          console.log("error");
        }
      });
    } */

    /* generateCode()
    {
      console.log("Codigo generado1");
      let reset = this.getEmailForm.value;
      console.log(reset);
      this.resetPassword.findUserbyEmail(reset).subscribe({
        next: result => {
          console.log("Codigo generado2");
          console.log(result);
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {}
      });
    } */

    /* resetPassword(email: string)
    {
      //let email = this.form.email;
      this.user.getUserbyEmail(email).subscribe({
        next: result => {
          console.log(result);
          this.router.navigate(['reset-password2']);
        },
        error: result => {}
      });
       //llamar a metodo que agrega codigo de verificacion
       //sendMail();
    } */

    /*sendCorreo(email, code){
      //metodo para enviar mail con el codigo generado
      let mailOptions = {
        from: '"<Reset Password>" patacon.reset@gmail.com',
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: '<h4><b>Reset Password</b></h4>' +
        '<p>To reset your password, complete this form:</p>' +
        '<a href=''</a>' + code +
        '<a href=localhost:4200/></a>' +
        '<br><br>' +
        '<p>--Team</p>'
    }
    let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
    if (mailSent) {
        return res.json({success: true, message: 'Check your mail to reset your password.'})
    } else {
        return throwFailed(error, 'Unable to send email.');
    }*/

    }
  
