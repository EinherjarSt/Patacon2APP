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

  addRoute(data: Route,jsonRoute): Observable<boolean>{
    console.log(data.ref_location);
    const body = new HttpParams()
    .set('id_route', "")
    .set('routes', jsonRoute)
    .set('ref_location',data.ref_location.id_location);

    console.log(body);
    return this.http.put<{ msg: string}>(env.api.concat("/route/add"), body)
    .pipe(
      map(result => {
        console.log(result.msg);
        return true;
      })
    );
  }

  updateRoute(idLocation,jsonRoute): Observable<boolean>{
    const body = new HttpParams()
    .set('routes', jsonRoute)
    .set('ref_location',idLocation);
    return this.http.post<{ msg: string}>(env.api.concat("/route/update"), body)
    .pipe(
      map(result => {
        console.log(result.msg);
        return true;
      })
    );
  }

  getRoute(id_location: string): Observable<Route>{
    const body = new HttpParams()
    .set('id_location', id_location);
    return this.http.get<Route>(env.api.concat("/route/get/"+id_location))
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

  getProducersWithoutRoutes():Observable<InfoRoute[]>{
    return this.http.get<InfoRoute[]>(env.api.concat("/route/getWithoutRoutes/"))
    .pipe(
      map(result => {
        return result;
      })
    );
  }

  deleteRoute(idLocation: string): Observable<boolean>{
    const body = new HttpParams()
    .set('idLocation', idLocation);
    return this.http.post<boolean>(env.api.concat("/route/delete/"+idLocation),body)
    .pipe(
      map(result => {
        return result;
      })
    );
  }

}
