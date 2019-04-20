import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  /* Request to server to verify if a user exist and return his token.
  *  If the token exist save it in localstorage with key access_token.
  */
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(env.api.concat('/login') , {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  /* Remove token from localstorage. If is needed to do something in backend when user logout
  * here there are to do the request.
  */
  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }}
