import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import { UsersService } from "../../../../services/users.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  hide = true;

  constructor(
    public thisDialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private userService: UsersService
  ) {
    this.form = new FormGroup({
      run: new FormControl("", Validators.required),
      name: new FormControl(""),
      surname: new FormControl(""),
      surname2: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("")
    });
  }

  ngOnInit() {}

  onCloseConfirm() {
    // Here add service to send data to backend
    console.log(this.form);
    console.log(this.form.value);
    let userData = this.form.value;
    this.userService.createUser(userData).subscribe({
      next: result => {
        console.log(result);
        this.thisDialogRef.close('Confirm');
      },
      error: result => {}
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close("Cancel");
  }

  getErrorMessage() {
    let email = this.form.controls["email"];
    return email.hasError("required")
      ? "Debe ingresar un valor"
      : email.hasError("email")
      ? "No es un email válido"
      : "";
  }
}
