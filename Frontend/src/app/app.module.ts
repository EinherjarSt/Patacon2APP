import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {environment as env} from '@env/environment';
import { MatPaginatorIntl } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    AmazingTimePickerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
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
  ]
})
export class AppModule { }


   