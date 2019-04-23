import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
}
from '@angular/material';


@NgModule({

    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatDialogModule,
        MatTableModule,
        FlexLayoutModule,
        MatSortModule
    ]
   
  })
  export class MaterialModule { }
  