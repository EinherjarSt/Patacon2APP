import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { TruckViewComponent } from './components/truck-view/truck-view.component';


const routes: Routes = [
  {path: 'usuarios', component: ListaUsuariosComponent},
  {path:'truck-view', component: TruckViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
