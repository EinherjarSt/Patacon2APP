import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { EstimatedDatesValidator } from './register-dispatch.custom.validators';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'edit-dispatch',
  templateUrl: './edit-dispatch.component.html',
  styleUrls: ['./edit-dispatch.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    
  ]
})
export class EditDispatchComponent implements OnInit {

  title: String;


  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<EditDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService) {
    this.title = "Editar despacho";
  }

  driverOptions: string[] = ['Por definir', 'Pedro Ruminot', 'Vladimir Putin', 'Nyango Star'];
  driverFilteredOptions: Observable<string[]>;

  truckOptions: string[] = ['CL12KAP', 'AX12MP1', '1ASLPMQ',];
  truckFilteredOptions: Observable<string[]>;

  statusOptions: string[] = ['En tránsito a viña', 'Cargando', 'En patio',
    'En tránsito a viña', 'Detenido', 'Terminado'];



  registerDispatchForm: FormGroup = this._formBuilder.group({
    driverReference: ['', [Validators.required]],
    truckReference: ['', [Validators.required]],
    planificationReference: [1, []],
    shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
    arrivalAtVineyardDate: ['', []],
    arrivalAtVineyardTime: ['', []],
    arrivalAtPataconDate: ['', []],
    arrivalAtPataconTime: ['', []],
    status: [this.statusOptions[0]],
    containerType: ['BINS']

  });

  ngOnInit() {
    this.driverFilteredOptions = this.registerDispatchForm.get('driverReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDrivers(value))
      );
    this.truckFilteredOptions = this.registerDispatchForm.get('truckReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTrucks(value))
      );
  }

  private _filterDrivers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.driverOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterTrucks(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.truckOptions.filter(option => option.toLowerCase().includes(filterValue));
  }



  public hasError = (controlName: string, errorName: string) => {
    return this.registerDispatchForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.registerDispatchForm.hasError(errorName);
  }

  onFormSubmit() {
    this.submitData(this.registerDispatchForm.value);
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(data) {

    var dispatchData = this.registerDispatchForm.value;
    this._dispatchesService.registerDispatch(dispatchData).subscribe({
      next: result => {
        console.log(result);
      },
      error: result => { }
    });
  }

  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido registrado.', 'Cerrar', {
      duration: 2000,
    });
  }

  onCloseSubmit() {
    this.dialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');
  }



}


