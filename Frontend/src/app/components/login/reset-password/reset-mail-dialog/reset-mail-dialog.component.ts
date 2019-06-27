import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'reset-mail-dialog',
  templateUrl: 'reset-mail-dialog.component.html',
})
export class ResetMailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ResetMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}