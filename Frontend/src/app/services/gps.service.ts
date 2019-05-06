import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";
import { Gps } from '../model-classes/gps';
import { Observable } from 'rxjs';
import { environment as env } from "@env/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor( private http: HttpClient) { }


  createGps(data: Gps): Observable<boolean> {
    const body = new HttpParams()
      .set("imei", data.imei)
      .set("number", data.number)
      .set("brand", data.brand)
      .set("model", data.model);

    return this.http
    .put<{ msg: string }>(env.api.concat("/user/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }
}
