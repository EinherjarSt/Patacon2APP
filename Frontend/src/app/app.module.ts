import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TripListComponent } from  './components/trip-list/trip-list.component'
import {AddTripComponent} from './components/add-trip/add-trip.component';
import { TruckViewComponent } from './components/truck-view/truck-view.component';
import { AddTruckComponent } from './components/add-truck/add-truck.component';

import { MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule, MatFormFieldModule, MatInputModule,MatDialogModule, MatPaginatorIntl} from "@angular/material";
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { FlexLayoutModule } from '@angular/flex-layout';  
import { LoginViewComponent } from './components/login-view/login-view.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {environment as env} from '@env/environment';



@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TruckViewComponent,
    AddTruckComponent,
    AddTripComponent,
    LoginViewComponent,
    NotFoundComponent,
  ],
  imports: [
    AmazingTimePickerModule,
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        whitelistedDomains: [env.api],
        blacklistedRoutes: [`${env.api}/login`]
      }
    })
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    AddTruckComponent,
    AddTripComponent
  ]
})
export class AppModule { }


   