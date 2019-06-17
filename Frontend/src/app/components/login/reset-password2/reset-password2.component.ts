import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';


@Component({
    selector: 'app-reset-password2',
    templateUrl: './reset-password2.component.html',
    styleUrls: ['./reset-password2.component.css']
  })

export class ResetPassword2Component implements OnInit {

    //resetPasswordForm: FormGroup;

    constructor(private auth:AuthService, private router:Router) { }
    ngOnInit() {
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    generateCode(email)
    {
      
    }
    
    backToLogin(){
    //this.auth.logout();
    this.router.navigate(['login/reset-password']);
    }

    resetPassword()
    {
       //llamar a metodo que agrega codigo de verificacion
       //sendMail();
    }
  }
