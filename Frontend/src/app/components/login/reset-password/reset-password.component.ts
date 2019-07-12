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
import { ResetMailDialogComponent } from './reset-mail-dialog/reset-mail-dialog.component';
import { ResetCodeDialogComponent } from './reset-code-dialog/reset-code-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';

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

    constructor(public dialog: MatDialog, private auth:AuthService, private router:Router, 
      private resetPassword:ResetPasswordService, private snackBar: MatSnackBar) { 
        this.getEmailForm = new FormGroup({
          email: new FormControl("", [Validators.required])
        });
        this.getVerCodeAndNewPasswordForm = new FormGroup({
          verCode: new FormControl("", [Validators.required]),
          newPassword: new FormControl("", [Validators.required]),
          newPasswordRepeated: new FormControl("", [Validators.required])
        });
      }

    ngOnInit() {
    }

    openMailFailureDialog(): void {
      let dialogRef = this.dialog.open(ResetMailDialogComponent, {
        width: '250px',
      });
    }

    openCodeFailureDialog(): void {
      let dialogRef = this.dialog.open(ResetCodeDialogComponent, {
        width: '250px',
      });
    }

    openPasswordFailureDialog(): void {
      let dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
        width: '250px',
      });
    }

    backToLogin(){
    this.router.navigate(['login']);
    }

    public selectionChange($event?: StepperSelectionEvent): void {
  
      if ($event.selectedIndex == 0) return; // First step is still selected
  
      this.selectedIndex = $event.selectedIndex;
    }
    public goto(index: number): void {
      if (index == 0) return; // First step is not selected anymore -ok
      
      this.selectedIndex = index;
    }

    openSuccessMessage() {
      this.snackBar.open("La contraseña ha sido modificada con éxito.", "Cerrar", {
        duration: 2000, verticalPosition: 'bottom'
      });
    }

    comprobateIfUserExists()
    {
      let email = this.getEmailForm.get("email").value;
      this.resetPassword.findUserbyEmail(email).subscribe({
        next: result => {
          this.goto(1);
          this.generateCode(email);
        },
        error: result => {
          this.openMailFailureDialog();
        }
      });
    }
  
    generateCode(email: string)
    {
      this.resetPassword.createCode(email).subscribe({
        next: result => {
        },
        error: result => {
        }
      });
    }

    changePassword()
    {
      let verification_code = this.getVerCodeAndNewPasswordForm.get("verCode").value;
      let password = this.getVerCodeAndNewPasswordForm.get("newPassword").value;
      let repeatedPassword = this.getVerCodeAndNewPasswordForm.get("newPasswordRepeated").value;
      this.resetPassword.findVerificationCode(verification_code).subscribe({
        next: result => {
          console.log(result);
          if (password == repeatedPassword)
          {
            this.resetPassword.changePassword(verification_code, password).subscribe({
              next: result => {
                setTimeout( () => { this.openSuccessMessage(); }, 3000 );
                this.router.navigate(['login']);
              },
              error: result => {
                this.openPasswordFailureDialog();
              }
            });
          }
          else
          {
            this.openPasswordFailureDialog();
          }
        },
        error: result => {
          this.openCodeFailureDialog(); 
        }
      });
    }

    }