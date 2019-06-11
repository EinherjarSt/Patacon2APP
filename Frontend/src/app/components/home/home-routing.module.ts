import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProducersComponent } from './producers/producers.component';
import { DriversComponent } from './drivers/drivers.component';
import { TrucksComponent } from './trucks/trucks.component';
import { PlanificationListComponent } from './planification/planification-list/planification-list.component';
import { DispatchListComponent } from './dispatch/dispatch-list/dispatch-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GpsComponent } from './gps/gps.component';
import { AuthGuard } from '../../guard/auth.guard';
import { GeneralSummaryComponent } from './statistics/general-summary/general-summary.component';
import { SummaryByDriverComponent } from './statistics/summary-by-driver/summary-by-driver.component';
import { StatisticsComponent } from './statistics/statistics.component';



const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    children:[
    {path: '',component: DashboardComponent},
     {path: 'usuarios',component: UsersComponent},
     {path: 'productores', component: ProducersComponent},
     {path: 'choferes',component: DriversComponent},
     {path: 'camiones', component: TrucksComponent},
     {path: 'despachos/:id', component: DispatchListComponent},
     {path: 'planificacion',component: PlanificationListComponent},
     {path: 'gps', component: GpsComponent},
     {path: 'estadisticas', component: StatisticsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
