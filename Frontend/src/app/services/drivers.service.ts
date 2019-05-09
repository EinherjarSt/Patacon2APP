import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Driver } from '../model-classes/driver';
import { environment as env } from "@env/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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

   /**
   * Request to server to verify if a driver exist and return his token.
   * @param data Data to send to backend
   */
  createDriver(data: Driver): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("name", data.name)
      .set("surname", data.surname)
      .set("surname2", data.surname2)
      .set("phoneNumber", data.phoneNumber);
    return this.http
      .put<{ msg: string }>(env.api.concat("/driver/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a driver.
   * @param data Data to send to backend
   */
  updateDriver(data: Driver): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("name", data.name)
      .set("surname", data.surname)
      .set("surname2", data.surname2)
      .set("phoneNumber", data.phoneNumber)
    return this.http
      .put<{ msg: string }>(
        env.api.concat("/driver/update"),
        body
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a driver.
   * @param data Data to send to backend
   */
  getAllDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(env.api.concat("/driver/getall")).pipe(
      map(result => {
        //console.log(result);
        return result;
      })
    );
  }

}

