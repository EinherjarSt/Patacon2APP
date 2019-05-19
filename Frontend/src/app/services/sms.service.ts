import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from '@env/environment';


@Injectable({
  providedIn: 'root'
})

export class SMS {

    constructor(private http: HttpClient) { }
  
    sendMessage(phoneNumber: string, menssage: string): Observable<String> {
  
      const body = new HttpParams()
      .set('phoneNumber', phoneNumber)
      .set('menssage', menssage);
  
      return this.http.post<{msg: string}>(env.api.concat('/sms/send') , body)
        .pipe(
          map(result => {
            return result.msg;
          })
        );
    }
   }
  