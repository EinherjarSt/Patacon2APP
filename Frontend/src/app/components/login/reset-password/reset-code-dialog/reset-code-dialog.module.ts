import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCommonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

import { ResetCodeDialogComponent } from './reset-code-dialog.component';

@NgModule({
  declarations: [ResetCodeDialogComponent],
  entryComponents: [ResetCodeDialogComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ResetCodeDialogModule {}