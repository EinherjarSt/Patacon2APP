import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Driver } from "../model-classes/driver";
import { environment as env } from "@env/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DriversService {
  constructor(private http: HttpClient) {}

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
      .set("phoneNumber", data.phoneNumber);
    return this.http
      .post<{ msg: string }>(
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

  getDriver(run: string): Observable<Driver>{
    const body = new HttpParams()
    .set('run', run);

    return this.http.get<Driver>(env.api.concat("/driver/get/"+run))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

/** Request to server to disable a driver.
   * @param data Data to send to backend
   */
  disableDriver(data: {run:string, disabled:boolean}): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("disabled", data.disabled ? "true" : "false");

    return this.http
      .put<{ msg: string }>(env.api.concat("/driver/disable"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to disable a driver.
   * @param data Data to send to backend
   */
  deleteDriver(run: string): Observable<boolean> {
    const body = new HttpParams().set("run", run);

    return this.http
      .post<{ msg: string }>(env.api.concat("/driver/delete"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }
}
