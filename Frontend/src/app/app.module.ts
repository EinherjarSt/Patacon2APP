import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ResizeService } from './services/resize.service';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginViewComponent,
    AddDriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
