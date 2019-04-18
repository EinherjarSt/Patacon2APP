import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { UserListComponent } from './components/user-list/user-list.component';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { NotFoundComponent } from './core/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    UserListComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


   