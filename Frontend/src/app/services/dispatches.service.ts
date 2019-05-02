import { Injectable } from '@angular/core';
import { Dispatch } from '../model-classes/dispatch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DispatchesService {
  private dataUrl = 'http://www.json-generator.com/api/json/get/ceLHlMlAia?indent=2';

  DISPATCHES:Dispatch[] = [
    
  ]
  
  _registrationUrl = 'http://localhost:3000/register_dispatch';

  constructor(private _http: HttpClient) {}

  getDispatches() {
    return this.DISPATCHES;
  }

  registerDispatch(dispatchData) {
    //Requests the backend to register the data.
    return this._http.post<any>(this._registrationUrl, dispatchData);
  }
}

