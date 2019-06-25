import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
//import { ResetPasswordComponent } from '../reset-password/reset-password.component';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})

export class LoginViewComponent implements OnInit {
  hiddenText = false;
  errorText = false;
  form : FormGroup;


  constructor(private auth: AuthService,
     private router: Router, 
    private route: ActivatedRoute) { 
    this.form = new FormGroup({
      'email': new FormControl("",[Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required)
    });
  }

  submit(){
    console.log(this.form);
    if (this.form.invalid) {
      (<any>Object).values(this.form.controls).forEach(control => {
          control.markAsTouched();
      });
      return;
    }
    let email:string = this.form.get('email').value,
    password:string  = this.form.get('password').value;
    this.hiddenText = true;
    this.auth.login(email, password).subscribe({
      next: (result) =>{
        console.log();
        this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']); 
      },
      error: (error) => {
        this.hiddenText = false;
        this.errorText = true;
        }
    });
  }

  /* openResetPasswordDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === "Confirm") this.refreshTable();
    });
  } */

  resetPassword()
  {
    console.log("Quiero restablecer contraseña");
    this.router.navigate(['reset-password']);
    return;
  }

  ngOnInit() {
  }
  disableMessage(event:any){
    this.errorText = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.form.get(controlName).hasError(errorName);
  };
}
