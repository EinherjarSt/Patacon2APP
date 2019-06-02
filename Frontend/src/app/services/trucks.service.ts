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
  disabled: boolean;
  available: boolean;

  constructor(private http: HttpClient) { }
  createTruck(data: Truck): Observable<boolean> {

    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("ref_driver", data.ref_driver['run'])
    .set("ref_gps", data.ref_gps['imei'])
    .set("brand", data.brand)
    .set("model", data.model)
    .set("year", data.year)
    .set("maxLoad", data.maxLoad)
    .set("owner", data.owner)
    .set("color", data.color);

    console.log("set params");
    console.log(body);
    //console.log(data.brand);
    //console.log(data.model);
    //console.log(data.owner);
    //console.log(data.color);

    return this.http
      .put<{ msg: string }>(env.api.concat("/truck/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  updateTruck(data: any): Observable<boolean> {
    console.log("Entro a updateTruck en trucks.service.ts");
    console.log(data.ref_driver);
    console.log(data.driverReference);
    //console.log(data.ref_gps);
    //console.log(data.gpsReference);
    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("driverReference", data.driverReference.run)
    .set("gpsReference", data.gpsReference.imei)
    .set("brand", data.brand)
    .set("model", data.model)
    .set("year", data.year)
    .set("maxLoad", data.maxLoad)
    .set("owner", data.owner)
    .set("color", data.color);

    return this.http
      .post<{ msg: string }>(
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

  /* deleteTruck(licencePlate: string): Observable<boolean> {
    const body = new HttpParams()
    .set("licencePlate", licencePlate);

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
  } */

  disableTruck(data: Truck): Observable<boolean> {
    console.log("Funcion Disable truck en Service");
    const body = new HttpParams()
    .set("licencePlate", data.licencePlate)
    .set("disabled", data.disabled ? 'true' : 'false');
    return this.http
      .post<{ msg: string }>(
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

  getTruck(licencePlate: string): Observable<Truck>{
    const body = new HttpParams()
    .set('licencePlate', licencePlate);

    return this.http.get<Truck>(env.api.concat("/truck/get/"+licencePlate))
    .pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

}