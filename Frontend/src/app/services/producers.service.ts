import { Injectable } from '@angular/core';
import { Producer } from '../model-classes/producer';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  getProducers(){
    return this.PRODUCERS;
  }

  getData(){
    return this.http.get<Producer[]>('http://www.json-generator.com/api/json/get/bQhbZtBTNe?indent=2');
  }

}
