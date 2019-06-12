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
import { UpdateProducerComponent } from './producers/update-producer/update-producer.component';

import { DriversComponent } from './drivers/drivers.component';
import { DriversListComponent } from './drivers/drivers-list/drivers-list.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';

import { DispatchListComponent } from './dispatch/dispatch-list/dispatch-list.component';
import { RegisterDispatchComponent } from './dispatch/register-dispatch/register-dispatch.component';

import { TrucksComponent } from './trucks/trucks.component';
import { TruckViewComponent } from './trucks/truck-view/truck-view.component';
import { AddTruckComponent } from './trucks/add-truck/add-truck.component';
import { EditTruckComponent } from './trucks/edit-truck/edit-truck.component';

import { PlanificationListComponent } from './planification/planification-list/planification-list.component';
import { DetailsComponent } from './planification/planification-list/details/details.component';
import { AddPlanificationComponent } from './planification/add-planification/add-planification.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AgmCoreModule } from '@agm/core';
import { FiltersComponent } from './dashboard/filters/filters.component';
import { GpsComponent } from './gps/gps.component';
import { GpsListComponent } from './gps/gps-list/gps-list.component';
import { AddGpsComponent } from './gps/add-gps/add-gps.component';
import { LatestEventsComponent } from './dashboard/latest-events/latest-events.component';
import { EditDispatchComponent } from './dispatch/edit-dispatch/edit-dispatch.component';
import { EditGpsComponent } from './gps/edit-gps/edit-gps.component';
import { ConfirmationDialogComponent } from '../core/confirmation-dialog/confirmation-dialog.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { EditDriverComponent } from './drivers/edit-driver/edit-driver.component';
import { DispatchDetailsComponent } from './dashboard/dispatch-details/dispatch-details.component';
import { GeneralSummaryComponent } from './statistics/general-summary/general-summary.component';
import { SummaryByDriverComponent } from './statistics/summary-by-driver/summary-by-driver.component';
import { RoutesComponent } from './routes/routes.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { UpdateLocationComponent } from './producers/update-location/update-location.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent, 
    AddUserComponent, 
    UserListComponent,
    UsersComponent, 
    RegisterDispatchComponent,
    EditDispatchComponent,
    DriversListComponent,
    ProducerListComponent, 
    AddProducerComponent,
    AddDriverComponent,
    ProducersComponent,
    TrucksComponent,
    DriversComponent,
    DispatchListComponent,
    TruckViewComponent,
    AddTruckComponent,
    UpdateProducerComponent,
    PlanificationListComponent,
    DetailsComponent,
    AddPlanificationComponent,
    DashboardComponent,
    FiltersComponent,
    GpsComponent,
    GpsListComponent,
    AddGpsComponent,
    LatestEventsComponent,
    EditDispatchComponent,
    EditGpsComponent,
    ConfirmationDialogComponent,
    EditUserComponent,
    EditDriverComponent,
    EditTruckComponent,
    DispatchDetailsComponent,
    GeneralSummaryComponent,
    SummaryByDriverComponent,
    UpdateLocationComponent,
    RoutesComponent,
    StatisticsComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1HH5VHGjmUH6NH_nWbquzVovye0VtNyc',
      libraries: ['geometry', 'drawing']
    }),
    ChartsModule
  ],
  entryComponents: [
    AddUserComponent,
    RegisterDispatchComponent,
    EditDispatchComponent,
    AddDriverComponent,
    AddProducerComponent,
    AddTruckComponent,
    UpdateProducerComponent,
    DetailsComponent,
    AddPlanificationComponent,
    AddGpsComponent,
    EditGpsComponent,
    ConfirmationDialogComponent,
    EditUserComponent,
    EditDriverComponent,
    EditTruckComponent,
    DispatchDetailsComponent,
    UpdateLocationComponent
  ],
})
export class HomeModule { }
