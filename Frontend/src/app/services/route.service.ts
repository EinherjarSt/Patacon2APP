import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from "@env/environment";
import { Route } from '../model-classes/route';
import { InfoRoute } from '../model-classes/infoRoute';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  addRoute(data: Route): Observable<boolean>{
    const body = new HttpParams()
    .set('id_route', data.id_route+"")
    .set('routes', data.routes+"")
    .set('ref_location',data.ref_location);

    console.log(body);
    return this.http.put<{ msg: string}>(env.api.concat("/route/add"), body)
    .pipe(
      map(result => {
        console.log(result.msg);
        return true;
      })
    );
  }

  getRoute(id_route: string): Observable<Route>{
    const body = new HttpParams()
    .set('id_route', id_route);
    return this.http.get<Route>(env.api.concat("/route/get/"+id_route))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  getRoutesInfo(): Observable<InfoRoute[]>{
    return this.http.get<InfoRoute[]>(env.api.concat("/route/getAllInfo/"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }


}
