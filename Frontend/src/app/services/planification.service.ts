import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Planification} from '../model-classes/planification'

@Injectable({
  providedIn: 'root'
})

export class PlanificationService {
  constructor(private http: HttpClient) { }
  urlRegistration = 'http://localhost:3000/register_planification';
  getData(){
    return this.http.get<Planification[]>('http://www.json-generator.com/api/json/get/ceAeFXyVwy?indent=2');
  }

  registerPlanification(data) {
    //Requests the backend to register the data.
    return this.http.post<any>(this.urlRegistration, data);
  }
}
