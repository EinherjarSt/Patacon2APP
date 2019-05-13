import { Injectable } from '@angular/core';
import { Dispatch } from '../model-classes/dispatch';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment as env } from "@env/environment";
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DispatchesService {


  constructor(private _http: HttpClient) { }
  
  registerDispatch(data: any): Observable<boolean> {
    console.log(data);
    
    const body = new HttpParams()
      .set("driverReference", data.driverReference)
      .set("truckReference", data.truckReference)
      .set("planificationReference", data.planificationReference.toString())
      .set("shippedKilograms", data.shippedKilograms.toString())
      .set("arrivalAtPataconDatetime", 
      moment(data.arrivalAtPataconDate.format('YYYY-MM-DD') + " " + data.arrivalAtPataconTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("arrivalAtVineyardDatetime", 
      moment(data.arrivalAtVineyardDate.format('YYYY-MM-DD') + " " + data.arrivalAtVineyardTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("containerType", data.containerType)
      .set("status", data.status);

    return this._http
      .put<{ msg: string }>(env.api.concat("/dispatches/register"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  
  getDispatches(): Observable<Dispatch[]> {
    return this._http.get<Dispatch[]>(env.api.concat("/despachos")).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }
}

