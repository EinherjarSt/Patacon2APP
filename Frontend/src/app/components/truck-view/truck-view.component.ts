import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface truck{
  model: string,
  brand: string,
  year: number,
  patent: string
}

const truckList: truck[] = [
  {model: 'modelo 1', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 2', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 3', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 4', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 5', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 6', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 7', brand: 'toyota', year: 1994, patent: 'ABDC12'}
];

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class TruckViewComponent implements OnInit {

  columns: string[] = ["model","brand","year","patent","actions"];
  dataSource = truckList;

  constructor(public dialog: MatDialog) { 

  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTruckDialog, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'add-truck-dialog',
  templateUrl: 'add-truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class AddTruckDialog {

  constructor(public dialogRef: MatDialogRef<AddTruckDialog>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
