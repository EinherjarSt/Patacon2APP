import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { TruckViewComponent } from './components/truck-view/truck-view.component';
import { AddTruckComponent } from './components/add-truck/add-truck.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ListaUsuariosComponent,
    TruckViewComponent,
    AddTruckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    AddTruckComponent
  ]
})
export class AppModule { }
