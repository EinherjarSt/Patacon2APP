import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AddTruckComponent } from './components/add-truck/add-truck.component';
import { ResizeService } from './services/resize.service';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { AddProducerComponent } from './components/add-producer/add-producer.component';
import { CreateUserViewComponent } from './components/create-user-view/create-user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddDriverComponent,
    AddTruckComponent,
    LoginViewComponent,
    AddProducerComponent,
    LoginViewComponent,
    CreateUserViewComponent,
    AddTruckComponent
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
