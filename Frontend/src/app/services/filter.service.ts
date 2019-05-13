import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private http: HttpClient) { }

  getAllRows(){
    return this.http.get("http://www.json-generator.com/api/json/get/bUKKKwVBDS?indent=2");
  }
}
