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
        moment(data.arrivalAtPataconDate + " " + data.arrivalAtPataconTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("arrivalAtVineyardDatetime",
        moment(data.arrivalAtVineyardDate + " " + data.arrivalAtVineyardTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("containerType", data.containerType)
      .set("status", data.status);

    return this._http
      .put<{ msg: string }>(env.api.concat("/despachos/registrar"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  editDispatch(data: any): Observable<boolean> {
    console.log(data);

    const body = new HttpParams()
      .set("driverReference", data.driverReference)
      .set("truckReference", data.truckReference)
      .set("planificationReference", data.planificationReference.toString())
      .set("shippedKilograms", data.shippedKilograms.toString())
      .set("arrivalAtPataconDatetime",
        moment(data.arrivalAtPataconDate + " " + data.arrivalAtPataconTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("arrivalAtVineyardDatetime",
        moment(data.arrivalAtVineyardDate + " " + data.arrivalAtVineyardTime).format('YYYY-MM-DD HH:mm:ss')
      )
      .set("containerType", data.containerType)
      .set("status", data.status);

    return this._http
      .put<{ msg: string }>(env.api.concat("/despachos/editar/" + data.id), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }


  deleteDispatch(dispatch_id: any): Observable<boolean> {

    const body = new HttpParams().set("dispatch_id", dispatch_id);

    return this._http
      .delete(env.api.concat("/despachos/eliminar/" + dispatch_id))
      .pipe(
        map(result => {
          return true;
        })
      );
  }

  getDispatches(planificationId): Observable<any[]> {

    console.log("ID en servicio " + planificationId);
    return this._http.get<any[]>(env.api.concat("/despachos/" + planificationId)).pipe(
      map(result => {
        
        return result.map(data => this.dispatchDataToDispatchObject(data));
      })
    );
  }
  
  getDispatchesWithFullInfo(): Observable<any[]> {
    return this._http.get<any[]>(env.api.concat("/despachos_completos")).pipe(
      map(result => {
        return result;  
      })
    );
  }

  getDispatchWithFullInfo(dispatchId): Observable<any> {
    return this._http.get<any>(env.api.concat("/despachos_completos/" + dispatchId)).pipe(
      map(result => {
        return result;  
      })
    );
  }

  formValuesToDispatchObject(data) : Dispatch{
    var formValues = data;

    return new Dispatch(
      formValues.id,
      formValues.driverReference.run,
      formValues.truckReference.id_truck,
      formValues.planificationReference,
      formValues.shippedKilograms,
      formValues.arrivalAtPataconDate.format('YYYY-MM-DD'),
      formValues.arrivalAtPataconTime,
      formValues.arrivalAtVineyardDate.format('YYYY-MM-DD'), 
      formValues.arrivalAtVineyardTime,
      formValues.status,
      formValues.containerType
      );
  }

  dispatchDataToDispatchObject(data) {
    var arrivalAtPataconDatetime = moment(data.arrivalAtPataconDate).format('YYYY-MM-DD HH:mm').split(' ');
    var arrivalAtVineyardDatetime = moment(data.arrivalAtVineyardDate).format('YYYY-MM-DD HH:mm').split(' ');


    return new Dispatch(
      data.id,
      data.driverReference,
      data.truckReference,
      data.planificationReference,
      data.shippedKilograms,
      arrivalAtPataconDatetime[0],
      arrivalAtPataconDatetime[1],
      arrivalAtVineyardDatetime[0], 
      arrivalAtVineyardDatetime[1],
      data.status,
      data.containerType
    );
  }

  
  getDispatchById(dispatch_id) : Observable<Dispatch>{

    return this._http.get<Dispatch>(env.api.concat(`/despachos/`+ dispatch_id)).pipe(
      map(result => {
        return this.dispatchDataToDispatchObject(result);
      })
    );
  }
  

}

