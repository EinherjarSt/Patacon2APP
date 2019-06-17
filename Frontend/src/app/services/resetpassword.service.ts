import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment as env } from "@env/environment";
import { User } from "../model-classes/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResetPassword } from '../model-classes/reset_password';

@Injectable({
    providedIn: "root"
  })
  export class ResetPasswordService {
  
    constructor(private http: HttpClient) {}

    static makeCode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        //console.log(makeCode(5));
        return result;
     }

    createCode(email: string): Observable<boolean> {
        var verification_code = ResetPasswordService.makeCode(8);
        const body = new HttpParams()
          .set("email", email)
          .set("verification_code", verification_code);
    
        return this.http
          .put<{ msg: string }>(env.api.concat("/resetpassword/add"), body)
          .pipe(
            map(result => {
              console.log(result.msg);
              return true;
            })
          );
      }

    /* findUserbyEmail(email: string): Observable<boolean>{
        //const body = new HttpParams()
        //.set('email', email);
        //console.log(email);
        return this.http.get<boolean>(env.api.concat("/resetpassword/get/"+email))
        .pipe(
        map(result => {
            return result;
        })
        );
    } */
}