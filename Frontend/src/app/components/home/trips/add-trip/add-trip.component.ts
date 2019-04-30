import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker, MatInput } from "@angular/material";

import { MAT_DIALOG_DATA , MatAutocomplete} from '@angular/material';
import { FormGroup,  FormControl, Validators } from '@angular/forms';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  title: String = "Agregar despacho";


  public : FormGroup = new FormGroup({
    $key: new FormControl(null),
    driver: new FormControl(''),
    truck: new FormControl(''),
    estimatedArrivalDateToProducer: new FormControl(''),
    estimatedArrivalTimeToProducer: new FormControl(''),
    estimatedArrivalDateAtPatacon: new FormControl(''),
    estimatedArrivalTimeToPatacon: new FormControl(''),
    //status: new FormControl(''),
    //kilograms: new FormControl(0),

    //container : new FormGroup({
      //bin: new FormControl(''),
      //tubs: new FormControl('')
    //})
    
  });


  driverOptions: string[] = ['Por definir','Pedro Ruminot', 'Vladimir Putin', 'Nyango Star'];
  filteredDriversOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredDriversOptions = this.form.get('driver').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDrivers(value))
      );
  }

  private _filterDrivers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.driverOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  constructor(private dialogRef: MatDialogRef<AddTripComponent>) {
    this.title = "Agregar viaje";
  }


  onCloseConfirm() {
    this.dialogRef.close('Confirm');

  }

  onCloseCancel() {
    this.dialogRef.close('Cancel');


  }

}
