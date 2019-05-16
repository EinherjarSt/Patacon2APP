import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gps } from "../model-classes/gps";
import { Observable } from "rxjs";
import { environment as env } from "@env/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GpsService {
  constructor(private http: HttpClient) {}

  /**
   * Request to server to verify if a user exist and return his token.
   * @param data Data to send to backend
   */
  createGPS(data: Gps): Observable<boolean> {
    const body = new HttpParams()
      .set("imei", data.imei)
      .set("simNumber", data.simNumber)
      .set("brand", data.brand)
      .set("model", data.model);
    return this.http
      .put<{
        msg: string;
      }>(env.api.concat("/gps/add"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /** Request to server to update a gps.
   * @param data Data to send to backend
   */
  updateGPS(data: Gps): Observable<boolean> {
    const body = new HttpParams()
      .set("imei", data.imei)
      .set("simNumber", data.simNumber)
      .set("brand", data.brand)
      .set("model", data.model);

    return this.http
      .post<{
        msg: string;
      }>(env.api.concat("/gps/update"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }

  /* Request to server to gps information
   */
  getGPS(imei: string): Observable<Gps> {
    return this.http.get<Gps>(env.api.concat("/gps/get/", imei)).pipe(
      map(result => {
        return result;
      })
    );
  }

  /** Request to server to get all gps.
   * @param data Data to send to backend
   */
  getAllGPS(): Observable<Gps[]> {
    return this.http.get<Gps[]>(env.api.concat("/gps/getall")).pipe(
      map(result => {
        return result;
      })
    );
  }

  /**
   * Get position only for gps that his imei are in gpsImei array
   * @param gpsImei: Array with imei of gps
   */
  getPositionOf(gpsImei: [string]) {
    const query = new HttpParams().set("gps", gpsImei.toString());

    return this.http
      .get<Gps[]>(env.api.concat("/gps/getposition"), {
        params: query
      })
      .pipe(
        map(result => {
          //console.log(result);
          return result;
        })
      );
  }

  /**
   * Get position of all gps
   *
   */
  getPositionOfAllGPS() {
    return this.http.get<Gps[]>(env.api.concat("/gps/getposition")).pipe(
      map(result => {
        //console.log(result);
        return result;
      })
    );
  }

  /** Request to server to disable a GPS.
   * @param data Data to send to backend
   */
  deleteGPS(imei: string): Observable<boolean> {
    const body = new HttpParams().set("imei", imei);

    return this.http
      .post<{ msg: string }>(env.api.concat("/gps/delete"), body)
      .pipe(
        map(result => {
          console.log(result.msg);
          return true;
        })
      );
  }
}
