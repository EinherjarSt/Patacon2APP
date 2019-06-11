import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';


@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })

export class ResetPasswordComponent implements OnInit {

    //resetPasswordForm: FormGroup;

    constructor(private auth:AuthService, private router:Router) { }
    ngOnInit() {
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    backToLogin(){
    //this.auth.logout();
    this.router.navigate(['login']);
    }

    resetPassword()
    {
       //llamar a metodo que agrega codigo de verificacion
       //sendMail();
    }

    /*sendCorreo(user, code){
      //metodo para enviar mail con el codigo generado
      let mailOptions = {
        from: '"<Reset Password>" patacon.reset@gmail.com',
        to: user.email,
        subject: 'Par',
        html: '<h4><b>Reset Password</b></h4>' +
        '<p>To reset your password, complete this form:</p>' +
        '<a href=''</a>' + code +
        '<a href=www.patacon.tk/reset-password></a>' +
        '<br><br>' +
        '<p>--Team</p>'
    }
    let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
    if (mailSent) {
        return res.json({success: true, message: 'Check your mail to reset your password.'})
    } else {
        return throwFailed(error, 'Unable to send email.');
    }

    }*/
  }
