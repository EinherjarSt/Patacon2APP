import { Injectable, ɵConsole } from '@angular/core';
import { InsightsData } from "../model-classes/insights_data";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "@env/environment";
import { map } from "rxjs/operators";
import * as moment from 'moment';
import { DashboardService } from '../services/dashboard.service';


@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor(private _http: HttpClient, private _lastEventsService: DashboardService) { }

  getDispatchInsightsData(dispatchId: number): Observable<InsightsData> {
    const body = new HttpParams();
    return this._http.get<InsightsData>(env.api.concat("/informacion/" + dispatchId))
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  editLastMessageSentData(dispatchId) {
    let messageDatetime = moment();
    const body = new HttpParams().set('messageDateTime', messageDatetime.format('YYYY-MM-DD HH:mm:ss'));
    return this._http
      .put<{ msg: string }>(env.api.concat("/informacion_mensaje/editar/" + dispatchId), body).subscribe(
        data=> {}, err => console.log(err)
      );
  }

  public getNumberOfMessagesSent(startDate, endDate) {
    const body = new HttpParams().set('startDate', startDate)
    .set('endDate', endDate);

    return this._http
      .put<{ messageCount: number }>(env.api.concat("/informacion/cantidad_de_mensajes"), body);
  }

  public getSuccessfulDispatchCount(startDate, endDate) {
    const body = new HttpParams().set('startDate', startDate)
    .set('endDate', endDate);

    return this._http
      .put<{ dispatchCount: number}>(env.api.concat("/informacion/cantidad_despachos_exitosos"), body);
      
  }

  public getCanceledDispatchCount(startDate, endDate) {
    const body = new HttpParams().set('startDate', startDate)
    .set('endDate', endDate);

    return this._http
      .put<{ dispatchCount: number }>(env.api.concat("/informacion/cantidad_despachos_cancelados"), body);
      
  }

  public getDispatchesInsightsByDataRange(startDate, endDate) {
    const body = new HttpParams().set('startDate', startDate)
    .set('endDate', endDate);

    return this._http
      .put<any>(env.api.concat("/informacion/despachos_por_fecha"), body);
      
  }

  calculateTotalTimePerStatus(dispatchId) {
    return this._lastEventsService.getAllEventsOfDispatch(dispatchId).pipe(
      map(events => {
        return {
          stopped: this._calculateTotalTimeInStatus(events, 'Detenido camino a Patacon'),
          inUnloadYard: this._calculateTotalTimeInStatus(events, 'En patio')
        };
      })
    );

  }

  _calculateTotalTimeInStatus(events, status) {

    const durations = [];    

    for (let index = 0; index < events.length; index++) {
      const currentEvent = events[index];

      if (currentEvent.status.localeCompare(status) == 0) {
        const nextEvent = events[index + 1];
        const startTime = moment(currentEvent.time);
        const endTime = moment(nextEvent.time);
        durations.push(moment.duration(endTime.diff(startTime)));

      }
    }
    const totalDurations = durations.slice(1)
    .reduce( (prev, cur) => cur.add(prev), moment.duration(durations[0]) )

    return totalDurations;

  }
  

}


