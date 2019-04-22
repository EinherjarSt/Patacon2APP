import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TripListComponent } from  './components/trip-list/trip-list.component'
import {AddTripComponent} from './components/add-trip/add-trip.component';

import { MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatFormFieldModule, MatInputModule,MatDialogModule} from "@angular/material";
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { FlexLayoutModule } from '@angular/flex-layout';  


@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    ToolbarComponent,
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCheckboxModule, 
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddTripComponent]
})
export class AppModule { }
