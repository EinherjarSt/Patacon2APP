import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env} from '@env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper:JwtHelperService) { }

  /* Request to server to verify if a user exist and return his token.
  *  If the token exist save it in localstorage with key access_token.
  */
  login(email: string, password: string): Observable<boolean> {

    const body = new HttpParams()
    .set('email', email)
    .set('password', password);

    return this.http.post<{token: string}>(env.api.concat('/login') , body)
      .pipe(
        map(result => {
          console.log("token recibido");
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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
