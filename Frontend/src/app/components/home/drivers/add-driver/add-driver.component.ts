import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { DriversService } from "../../../../services/drivers.service";

@Component({
  selector: "app-add-driver",
  templateUrl: "./add-driver.component.html",
  styleUrls: ["./add-driver.component.css"]
})
export class AddDriverComponent implements OnInit {
  hide = true;
  email = new FormControl("", [Validators.required, Validators.email]);

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDriverComponent>,
    private driverService: DriversService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  registerDriverForm: FormGroup = this.formBuilder.group({
    run: ["", [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/)]],
    name: ["", [Validators.required]],
    surname: ["", [Validators.required]],
    surname2: ["", [Validators.required]],
    phoneNumber: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]]
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.registerDriverForm.get(controlName).hasError(errorName);
  };

  public hasFormError(errorName: string) {
    return this.registerDriverForm.hasError(errorName);
  }

  onCloseConfirm() {
    this.dialogRef.close("Confirm");
  }

  onCloseCancel() {
    this.dialogRef.close("Cancel");
  }

  onFormSubmit() {
    let newDriver = this.registerDriverForm.value;
    this.driverService.createDriver(newDriver).subscribe(
      response => {
        console.log("Success", response);
        this.onCloseConfirm();
        this.openSuccessMessage();
      },
      error => console.error("Error", error)
    );
  }

  openSuccessMessage() {
    this.snackBar.open("El chofer ha sido registrado.", "Cerrar", {
      duration: 5000
    });
  }
}
