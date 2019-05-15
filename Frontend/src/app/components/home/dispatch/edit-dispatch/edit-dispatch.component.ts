import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DispatchesService } from '../../../../services/dispatches.service';
import { Inject } from '@angular/core';

import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Dispatch } from '../../../../model-classes/dispatch';
import * as moment from 'moment';

@Component({
  selector: 'edit-dispatch',
  templateUrl: './edit-dispatch.component.html',
  styleUrls: ['./edit-dispatch.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class EditDispatchComponent implements OnInit {

  title: String;
  editDispatchForm: FormGroup;
  dispatchData: Dispatch;


  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<EditDispatchComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService, @Inject(MAT_DIALOG_DATA) public data: Dispatch) {
    this.title = "Editar despacho";
    this.dispatchData = data;

  }

  driverOptions: string[] = ['Por definir', 'Pedro Ruminot', 'Vladimir Putin', 'Nyango Star'];
  driverFilteredOptions: Observable<string[]>;

  truckOptions: string[] = ['CL12KAP', 'AX12MP1', '1ASLPMQ',];
  truckFilteredOptions: Observable<string[]>;

  statusOptions: string[] = ['En tránsito a viña', 'Cargando', 'En patio',
    'En tránsito a viña', 'Detenido', 'Terminado'];


  createForm() {
    this.editDispatchForm = this._formBuilder.group({
      id: [],
      driverReference: ['', [Validators.required]],
      truckReference: ['', [Validators.required]],
      planificationReference: [],
      shippedKilograms: ['', [Validators.required, Validators.min(1), Validators.pattern('([1-9][0-9]*)$')]],
      arrivalAtVineyardDate: ['', [Validators.required]],
      arrivalAtVineyardTime: ['', [Validators.required]],
      arrivalAtPataconDate: ['', [Validators.required]],
      arrivalAtPataconTime: ['', [Validators.required]],
      status: [''],
      containerType: ['']

    });
  }


  ngOnInit() {
    this.createForm();
    this.setFormValues(this.dispatchData);


    this.driverFilteredOptions = this.editDispatchForm.get('driverReference').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDrivers(value))
      );
    this.truckFilteredOptions = this.editDispatchForm.get('truckReference').valueChanges
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
    return this.editDispatchForm.get(controlName).hasError(errorName);
  }

  public hasFormError(errorName: string) {
    return this.editDispatchForm.hasError(errorName);
  }

  onFormSubmit() {
    this.submitData(this._dispatchesService.formValuesToDispatchObject(this.editDispatchForm.value));
    this.onCloseSubmit();
    this.openSuccessMessage();

  }

  submitData(dispatchData) {

    this._dispatchesService.editDispatch(dispatchData).subscribe({
      next: result => {
        console.log(result);
      },
      error: result => { }
    });
  }


  getDispatchData(dispatch_id) {
    this._dispatchesService.getDispatchById(dispatch_id).subscribe({
      next: (data: Dispatch) => {
        this.setFormValues(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  setFormValues(dispatch: Dispatch) {
    this.editDispatchForm.setValue(this.dispatchObjectToFormData(dispatch));
  }

  dispatchObjectToFormData(dispatch) {

    return {

      id: dispatch.id,
      driverReference: dispatch.driverReference,
      truckReference: dispatch.truckReference,
      planificationReference: dispatch.planificationReference,
      shippedKilograms: dispatch.shippedKilograms,
      arrivalAtVineyardDate: moment(dispatch.arrivalAtVineyardDate),
      arrivalAtVineyardTime: dispatch.arrivalAtVineyardTime,
      arrivalAtPataconDate: moment(dispatch.arrivalAtPataconDate),
      arrivalAtPataconTime: dispatch.arrivalAtPataconTime,
      status: dispatch.status,
      containerType: dispatch.containerType
    };
  }



  openSuccessMessage() {
    this.snackBar.open('El despacho ha sido editado.', 'Cerrar', {
      duration: 2000,
    });
  }
  
  onCloseSubmit() {
    this.dialogRef.close({ confirmed: true });

  }

  onCloseCancel() {
    this.dialogRef.close({ confirmed: false });
  }


}


