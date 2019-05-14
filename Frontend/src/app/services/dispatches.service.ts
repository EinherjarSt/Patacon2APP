import { Injectable } from '@angular/core';
import { Dispatch } from '../model-classes/dispatch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class DispatchesService {
  private dataUrl = 'http://www.json-generator.com/api/json/get/ceLHlMlAia?indent=2';

  DISPATCHES:Dispatch[] = [
    
  ]
  
  constructor(private _http: HttpClient) {}

  getDispatches() {
    return this.DISPATCHES;
  }

  registerDispatch(dispatchData) {
    //Requests the backend to register the data.
    return this._http.post<any>(env.api.concat("register_dispatch"), dispatchData);
  }
}

