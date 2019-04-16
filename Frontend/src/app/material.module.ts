import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule
}
from '@angular/material';


@NgModule({

    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule
    ]
   
  })
  export class MaterialModule { }
  