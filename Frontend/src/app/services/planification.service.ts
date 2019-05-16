import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Planification} from '../model-classes/planification'
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class PlanificationService {
  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get<Planification[]>('http://www.json-generator.com/api/json/get/ceAeFXyVwy?indent=2');
  }

  registerPlanification(data) {
    //Requests the backend to register the data.
    return this.http.post<any>(env.api.concat("register_planification"), data);
  }
}
