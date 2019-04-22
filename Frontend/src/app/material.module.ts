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
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatDialogModule,

 
        
 
   


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
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatDialogModule


    ]
   
  })
  export class MaterialModule { }
  