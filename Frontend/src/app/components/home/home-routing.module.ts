import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProducersComponent } from './producers/producers.component';
import { DriversComponent } from './drivers/drivers.component';
import { TrucksComponent } from './trucks/trucks.component';
import { DispatchListComponent } from './dispatch/dispatch-list/dispatch-list.component';




const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:[
    {path: '',component: DashboardComponent},
     {path: 'usuarios',component: UsersComponent},
     {path: 'productores', component: ProducersComponent},
     {path: 'choferes',component: DriversComponent},
     {path: 'camiones', component: TrucksComponent},
     {path: 'despachos', component: DispatchListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
