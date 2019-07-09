import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'reset-code-dialog',
  templateUrl: 'reset-code-dialog.component.html',
})
export class ResetCodeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ResetCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}