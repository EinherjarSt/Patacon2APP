import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/core/not-found/not-found.component';





const routes: Routes = [
  {path: 'inicio', loadChildren: './components/home/home.module#HomeModule'},
  {path: 'login',  loadChildren: './components/login/login.module#LoginModule' },
  {path: 'producer',  loadChildren: './components/producer/producer.module#ProducerModule' },
  {path: 'not-found', component: NotFoundComponent},
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'not-found'},
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
