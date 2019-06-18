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


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })

export class ResetPasswordComponent implements OnInit {
    getEmailForm: FormGroup;
    getVerCodeForm: FormGroup;
    getNewPasswordForm: FormGroup;

    //resetPasswordForm: FormGroup;

    constructor(private auth:AuthService, private router:Router, 
      private resetPassword:ResetPasswordService) { 
        this.getEmailForm = new FormGroup({
          email: new FormControl("")
        });
        this.getVerCodeForm = new FormGroup({
          verCode: new FormControl("")
        });
        this.getNewPasswordForm = new FormGroup({
          newEmail: new FormControl("")
        });
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
  
    generateCode()
    {
      let email = this.getEmailForm.get("email").value;
      console.log("email");
      this.resetPassword.createCode(email).subscribe({
        next: result => {
          console.log(result);
          console.log("codigo se ha generado");
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {
          console.log("error");
        }
      });
    }

    comprobationOfCode()
    {
      let ver_code = this.getVerCodeForm.get("verCode").value;
      console.log("verCode");
      this.resetPassword.verificateCode(ver_code).subscribe({
        next: result => {
          console.log(result);
          console.log("codigo asociado con un mail");
          //this.thisDialogRef.close('Confirm');
        },
        error: result => {
          console.log("error");
        }
      });
    }

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
