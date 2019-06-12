import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OutOfRouteService {

  constructor() { 
    console.log("Servicio creado");
  }
}
