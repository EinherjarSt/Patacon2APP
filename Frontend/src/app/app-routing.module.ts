import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginViewComponent } from './components/login-view/login-view.component';




const routes: Routes = [
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'login', component: LoginViewComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
