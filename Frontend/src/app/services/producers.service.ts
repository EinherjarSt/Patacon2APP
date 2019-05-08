import { Injectable } from '@angular/core';
import { Producer } from '../model-classes/producer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProducersService {

  PRODUCERS : Producer[] = [
   
  ];

  constructor(private http: HttpClient) { }

  getProducers(){
    return this.PRODUCERS;
  }

  getData(){
    return this.http.get<Producer[]>('http://www.json-generator.com/api/json/get/bQhbZtBTNe?indent=2');
  }

}
