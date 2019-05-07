import { Injectable } from '@angular/core';
import { Producer } from '../model-classes/producer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment as env } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProducersService {
  
  constructor(private http: HttpClient) { 

  }

  addProducer(data: Producer): Observable<boolean>{
    const body = new HttpParams()
    .set('name', data.name)
    .set('rut', data.rut)
    .set('telephone', data.telephone)
    .set('manager', data.manager);

    return this.http.put<{ msg: string}>(env.api.concat("/producer/add"), body)
    .pipe(
      map(result => {
        console.log(result.msg);
        return true;
      })
    );
  }

  modifyProducer(data: Producer): Observable<boolean>{
    const body = new HttpParams()
    .set('name', data.name)
    .set('rut', data.rut)
    .set('telephone', data.telephone)
    .set('manager', data.manager);

    return this.http.put<{ msg: string}>(env.api.concat("/producer/update"), body)
    .pipe(
      map(result => {
        console.log(result.msg);
        return true;
      })
    );
  }

  getProducers(): Observable<Producer[]>{
    
    return this.http.get<Producer[]>(env.api.concat("/producer/getAll"))
    .pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  deleteProducer(){
    
  }

  

}
