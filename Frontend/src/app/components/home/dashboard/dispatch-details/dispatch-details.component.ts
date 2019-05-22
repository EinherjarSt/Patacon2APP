import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput, MatSelect, MatRadioButton, MatSnackBar } from "@angular/material";

import { MAT_DIALOG_DATA, MatAutocomplete } from '@angular/material';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DispatchesService } from '../../../../services/dispatches.service';
import { Inject } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {Filter} from '../../../../model-classes/filter';
import * as moment from 'moment';

@Component({
  selector: 'dispatch-details',
  templateUrl: './dispatch-details.component.html',
  styleUrls: ['./dispatch-details.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL'},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class DispatchDetailsComponent implements OnInit {

  title: String;
  detailsForm: FormGroup;
  dispatchData: Filter;


  constructor(private snackBar: MatSnackBar, private dialogRef: MatDialogRef<DispatchDetailsComponent>,
    private _formBuilder: FormBuilder, private _dispatchesService: DispatchesService, @Inject(MAT_DIALOG_DATA) public data: Filter) {
    this.title = "Detalles";
    this.dispatchData = data;

  }


  createForm() {
    this.detailsForm = this._formBuilder.group({
      dispatchId: [],
      dispatchStatus: [],
      truckLicensePlate: [],
      arrivalAtPataconDatetime: [],
      arrivalAtVineyardDatetime: [],
      shippedKilograms: [],
      containerType: [],
      driverRun: [],
      driverName: [],
      driverPhoneNumber: [],
      producerName: [],
      producerLocation: [],
    });
  }


  ngOnInit() {
    this.createForm();
    this.setFormValues(this.dispatchData);
  }




  setFormValues(dispatch: Filter) {
    this.detailsForm.patchValue({
      dispatchId: dispatch.dispatchId,
      dispatchStatus: dispatch.dispatchStatus,
      truckLicensePlate: dispatch.truckLicensePlate,
      arrivalAtPataconDatetime: moment(dispatch.arrivalAtPataconDatetime).format('D/M/YY HH:mm'),
      arrivalAtVineyardDatetime: moment(dispatch.arrivalAtVineyardDatetime).format('D/M/YY HH:mm'),
      shippedKilograms: dispatch.shippedKilograms,
      containerType: dispatch.containerType,
      driverRun: dispatch.driverRun,
      driverName: dispatch.driverName,
      driverPhoneNumber: dispatch.driverPhoneNumber,
      producerName: dispatch.producerName,
      producerLocation: dispatch.producerLocation

    });
  }


  onReturn() {
    this.dialogRef.close();
  }


}


