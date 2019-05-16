import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})

export class LoginViewComponent implements OnInit {

  form : FormGroup;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.form = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  submit(){
    let email:string = this.form.get('email').value,
    password:string  = this.form.get('password').value;
    this.auth.login(email, password).subscribe({
      next: (result) =>{
        console.log();
        this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']); 
      },
      error: (error) => {console.log(error.error)}
    });
  }

  ngOnInit() {
  }

}
