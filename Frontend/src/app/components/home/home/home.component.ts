import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


declare interface RouteInfo{
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'usuarios', title: 'Usuarios',icon: 'people', class: '' },
  { path: 'camiones', title: 'Camiones',icon: 'local_shipping', class: '' },
  { path: 'choferes', title: 'Choferes',icon: '', class: '' },
  { path: 'productores', title: 'Productores',icon: 'nature_people', class: '' },
  { path: 'gps', title: 'GPS',icon: 'near_me', class: '' },
  { path: 'planificacion', title: 'Planificación',icon: 'table_chart', class: '' },
  { path: 'routes', title: 'Rutas',icon: 'directions', class: '' },


];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuItems: any[];

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }

}
