import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Truck } from "../model-classes/truck";
import { environment as env} from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class TrucksService {

  constructor(private http: HttpClient) { }

  createTruck(data: Truck): Observable<boolean> {

    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("brand", data.brand)
    .set("model", data.model)
    .set("year", data.year)
    .set("maxLoad", data.maxLoad)
    .set("owner", data.owner)
    .set("color", data.color);

    console.log("set params");

    return this.http
      .put<{ msg: string }>(env.api.concat("/truck/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  updateTruck(data: Truck): Observable<boolean> {
    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("brand", data.brand)
    .set("model", data.model)
    .set("year", data.year)
    .set("maxLoad", data.maxLoad)
    .set("owner", data.owner)
    .set("color", data.color);

    return this.http
      .put<{ msg: string }>(
        env.api.concat("/truck/update"),
        body
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  deleteTruck(data: Truck): Observable<boolean> {
    const body = new HttpParams()
    .set("licencePlate", data.licencePlate);

    return this.http
      .put<{ msg: string }>(
        env.api.concat("/truck/delete"),
        body
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  disableTruck(data: Truck): Observable<boolean> {
    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("disabled", data.disabled ? 'true' : 'false');
    return this.http
      .put<{ msg: string }>(
        env.api.concat("/truck/disable"),
        body
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  getAllTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(env.api.concat("/truck/getall")).pipe(
      map(result => {
        return result;
      })
    );
  }

}