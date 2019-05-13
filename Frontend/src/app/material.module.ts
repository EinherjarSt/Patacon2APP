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
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
}
from '@angular/material';

import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({

    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatSidenavModule,
        MatSortModule,
        MatMenuModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatExpansionModule       
    ],
    exports: [
        FlexLayoutModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatSidenavModule,
        MatSortModule,
        MatMenuModule,
        MatDialogModule,
        MatTableModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatExpansionModule,

    ]
   
  })
  export class MaterialModule { }
  