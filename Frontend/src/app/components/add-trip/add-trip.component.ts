import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDatepicker } from "@angular/material";
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {


  title: String;

  driverControl = new FormControl();
  driverOptions: string[] = ['Por definir','Pedro Ruminot', 'Vladimir Putin', 'Nyango Star' ];
  filteredDriversOptions: Observable<string[]>;

  producerControl = new FormControl();
  producerOptions: string[] = ['CARLOS SCHENEIDER', 'AGR. EL SAUCE ROMERAL', 'MIGUEL FUENZALIDA', 'SAN JORGE'];
  filteredProducerOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredDriversOptions = this.driverControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDrivers(value))
      );

    this.filteredProducerOptions = this.producerControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterProducers(value))
    );
  }

  private _filterDrivers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.driverOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterProducers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.producerOptions.filter(option => option.toLowerCase().includes(filterValue));
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
