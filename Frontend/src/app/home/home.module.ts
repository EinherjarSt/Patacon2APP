import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { UsersComponent } from './home/users/users.component';


@NgModule({
  declarations: [HomeComponent, UsersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
  
  ]
})
export class HomeModule { }
