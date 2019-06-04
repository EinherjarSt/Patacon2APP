import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
  })

export class ResetPasswordComponent implements OnInit {

    constructor(private auth:AuthService, private router:Router) { }
    ngOnInit() {
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    
    backToLogin(){
    //this.auth.logout();
    this.router.navigate(['login']);
  }
  }
