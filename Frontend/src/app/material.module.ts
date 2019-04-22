import { NgModule } from '@angular/core';

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
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
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
        MatTableModule,
        MatSortModule
    ]
   
  })
  export class MaterialModule { }
  