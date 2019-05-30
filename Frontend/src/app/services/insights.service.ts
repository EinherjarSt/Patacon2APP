import { Injectable, ɵConsole } from '@angular/core';
import { InsightsData } from "../model-classes/insights_data";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment as env } from "@env/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  constructor(private _http: HttpClient) { }

  getDispatachInsightsData(dispatchId: number): Observable<InsightsData>{
    const body = new HttpParams();
    return this._http.get<InsightsData>(env.api.concat("/informacion/" + dispatchId))
    .pipe(
      map(result => {
        return result;
      })
    );
  }
}


