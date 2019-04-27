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
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule
    ]
   
  })
  export class MaterialModule { }
  