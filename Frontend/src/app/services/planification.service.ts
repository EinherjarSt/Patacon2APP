import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment as env } from "@env/environment";
import { Planification} from '../model-classes/planification'

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
    const body = new HttpParams()
      .set("planification_id",data.planification_id+"")
      .set("ref_location", data.ref_location)
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
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a planification.
   * @param data Data to send to backend
   */
  updateDriver(data: Planification): Observable<boolean> {
    const body = new HttpParams()
      .set("planification_id",data.planification_id+"")
      .set("ref_location", data.ref_location)
      .set("grapeVariety", data.grapeVariety)
      .set("harvestingType", data.harvestingType)
      .set("containerType", data.containerType)
      .set("kilograms", data.kilograms+"")
      .set("quality", data.quality)
      .set("freight", data.freight)
      .set("comment", data.comment)
      .set("date", data.date);
    return this.http
      .put<{ msg: string }>(
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
}
