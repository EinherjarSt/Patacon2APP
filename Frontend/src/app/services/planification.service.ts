import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "@env/environment";
import { Planification} from '../model-classes/planification'
import { Producer } from '../model-classes/producer';

@Injectable({
  providedIn: 'root'
})

export class PlanificationService {
  constructor(private http: HttpClient) { }
  urlRegistration = 'http://localhost:3000/register_planification';
  getData(){
    return this.http.get<Planification[]>('http://www.json-generator.com/api/json/get/ceAeFXyVwy?indent=2');
  }

  registerPlanification(data) {
    //Requests the backend to register the data.
    return this.http.post<any>(this.urlRegistration, data);
  }

   /**
   * Request to server to verify if a planification exist and return his token.
   * @param data Data to send to backend
   */
  createPlanification(data: Planification): Observable<boolean> {
    const d = new Date(data.date).toISOString().replace(/T/, " ").replace(/\..+/,'').substr(0,10).split('-');
    data.date =d[2]+'-'+d[1]+'-'+d[0];
    const body = new HttpParams()
      .set("ref_producer", data.ref_producer.rut)
      .set("ref_location", data.ref_location.id_location)
      .set("grapeVariety", data.grapeVariety)
      .set("harvestingType", data.harvestingType)
      .set("containerType", data.containerType)
      .set("kilograms", data.kilograms+"")
      .set("quality", data.quality)
      .set("freight", data.freight)
      .set("comment", data.comment)
      .set("date", data.date);

    return this.http
      .put<{ msg: string }>(env.api.concat("/planification/add"), body)
      .pipe(
        map(result => {
          return true;
        })
      );
  }

  /** Request to server to update a planification.
   * @param data Data to send to backend
   */
  updatePlanification(data: Planification, idPlanification: string): Observable<boolean> {
    const d = new Date(data.date).toISOString().replace(/T/, " ").replace(/\..+/,'').substr(0,10).split('-');
    data.date =d[2]+'-'+d[1]+'-'+d[0];
    console.log("UPDATE");
    console.log(data.planification_id);
    const body = new HttpParams()
      .set("planification_id",idPlanification)
      .set("ref_producer", data.ref_producer.rut)
      .set("ref_location", data.ref_location.id_location)
      .set("grapeVariety", data.grapeVariety)
      .set("harvestingType", data.harvestingType)
      .set("containerType", data.containerType)
      .set("kilograms", data.kilograms+"")
      .set("quality", data.quality)
      .set("freight", data.freight)
      .set("comment", data.comment)
      .set("date", data.date);
    return this.http
      .post<{ msg: string }>(
        env.api.concat("/planification/update"),
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
  getAllPlanifications(): Observable<Planification[]> {
    return this.http.get<Planification[]>(env.api.concat("/planification/getall")).pipe(
      map(result => {
        //console.log(result);
        return result;
      })
    );
  }

  deletePlanification(id: string): Observable<boolean>{
    const body = new HttpParams()
    .set('id', id);
    return this.http.get<boolean>(env.api.concat("/planification/delete/"+id))
    .pipe(
      map(result => {
        return result;
      })
    );
  }
}
