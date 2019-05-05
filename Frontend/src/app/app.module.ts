import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { getSpanishPaginatorIntl } from './spanish-paginator-intl';
import {environment as env} from '@env/environment';
import { MatPaginatorIntl } from '@angular/material';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
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
    { provide: LOCALE_ID, useValue: 'es-CL' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
  entryComponents:[
  ]
})
export class AppModule { }


   