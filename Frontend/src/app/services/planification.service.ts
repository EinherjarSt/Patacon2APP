import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Planification} from '../model-classes/planification'

@Injectable({
  providedIn: 'root'
})

export class PlanificationService {
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<Planification[]>('http://www.json-generator.com/api/json/get/cfoAzQfaMi?indent=2');
  }
}
