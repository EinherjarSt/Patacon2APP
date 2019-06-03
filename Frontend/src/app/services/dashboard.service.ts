import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Event } from '../model-classes/event';
import { environment as env } from "@env/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

   /** Request to server to obtain all events
   * @param data Data to send to backend
   */
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(env.api.concat("/event/getall")).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  getAllEventsOfDispatch(dispatchId): Observable<Event[]> {

    return this.http.get<Event[]>(env.api.concat("/eventos/" + dispatchId)).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }
}
