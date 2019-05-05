import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from '../model-classes/driver';


@Injectable({
  providedIn: 'root'
})
export class DriversService {
  _registrationUrl = 'http://localhost:3000/register_driver';
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<Driver[]>('http://www.json-generator.com/api/json/get/bQxNNzURqq?indent=2');
  }
  registerDriver(dispatchData) {
    //Requests the backend to register the data.
    return this.http.post<any>(this._registrationUrl, dispatchData);
  }
}

