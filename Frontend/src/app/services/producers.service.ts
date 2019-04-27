import { Injectable } from '@angular/core';
import { Producer } from '../model-classes/producer';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  PRODUCERS : Producer[] = [
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
    {name: "nombre", rut:'11111111-1', manager:'nombre', location:'location', telephone:'12345678'},
  ];

  constructor() { 

  }

  getProducers(){
    return this.PRODUCERS;
  }

}
