import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../../material.module';

import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserListComponent } from './users/user-list/user-list.component';

import { ProducersComponent } from './producers/producers.component';
import { ProducerListComponent } from './producers/producer-list/producer-list.component';
import { AddProducerComponent } from './producers/add-producer/add-producer.component';

import { DriversComponent } from './drivers/drivers.component';
import { DriversListComponent } from './drivers/drivers-list/drivers-list.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';

import { TripsComponent } from './trips/trips.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { TripListComponent } from './trips/trip-list/trip-list.component';

import { TrucksComponent } from './trucks/trucks.component';
import { TruckViewComponent } from './trucks/truck-view/truck-view.component';
import { AddTruckComponent } from './trucks/add-truck/add-truck.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AgmCoreModule } from '@agm/core';
import { FiltersComponent } from './dashboard/filters/filters.component';






@NgModule({
  declarations: [
    HomeComponent, 
    AddUserComponent, 
    UserListComponent,
    UsersComponent, 
    AddTripComponent,
    DriversListComponent,
    ProducerListComponent, 
    AddProducerComponent,
    AddDriverComponent,
    TripsComponent,
    ProducersComponent,
    TrucksComponent,
    DriversComponent,
    TripListComponent,
    TruckViewComponent,
    AddTruckComponent,
    DashboardComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc'
    })
  ],
  entryComponents: [
    AddUserComponent,
    AddTripComponent,
    AddDriverComponent,
    AddProducerComponent,
    AddTruckComponent
  ],
})
export class HomeModule { }
