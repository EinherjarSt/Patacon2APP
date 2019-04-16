import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class TruckViewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTruckDialog, {
      width: '250px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'add-truck-dialog',
  templateUrl: 'add-truck-view.component.html',
})
export class AddTruckDialog {

  constructor(public dialogRef: MatDialogRef<AddTruckDialog>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
