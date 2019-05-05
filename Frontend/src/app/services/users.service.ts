import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment as env } from "@env/environment";
import { User } from "../model-classes/user";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor(private http: HttpClient) {}

  /**
   * Request to server to verify if a user exist and return his token.
   * @param data Data to send to backend
   */
  createUser(data: User): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("name", data.name)
      .set("surname", data.surname)
      .set("surname2", data.surname2)
      .set("email", data.email)
      .set("password", data.password)
      .set("position", data.position);

    return this.http
      .put<{ msg: string }>(env.api.concat("/user/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a user.
   * @param data Data to send to backend
   */
  updateUser(data: User): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("name", data.name)
      .set("surname", data.surname)
      .set("surname2", data.surname2)
      .set("email", data.email)
      .set("password", data.password)
      .set("position", data.position);

    return this.http
      .put<{ msg: string }>(
        env.api.concat("/user/update"),
        body
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a user.
   * @param data Data to send to backend
   */
  getAllUsers(): Observable<User[]> {
    // let headers = new HttpHeaders({
    //   "Accept": "application/json"
    // });
    // let options = { headers };

    return this.http.get<User[]>(env.api.concat("/user/getall")).pipe(
      map(result => {
        //console.log(result);
        return result;
      })
    );
  }

  /** Request to server to update a user.
   * @param data Data to send to backend
   */
  updateUserStatus(data: {run:string, status:boolean}): Observable<boolean> {
    const body = new HttpParams()
      .set("run", data.run)
      .set("status", data.status ? 'true' : 'false');

    return this.http
      .put<{ msg: string }>(
        env.api.concat("/user/update-status", data.run),
        body,
      )
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }
}
