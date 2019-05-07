import { Injectable } from '@angular/core';
import { Dispatch } from '../model-classes/dispatch';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DispatchesService {
  private _dataUrl = 'http://www.json-generator.com/api/json/get/bUqAZhvEjm?indent=2';
  private _registrationUrl = 'http://localhost:3000/register_dispatch';

  
  constructor(private _http: HttpClient) {}

  getDispatches() {
    return this._http.get(this._dataUrl);
  }

  registerDispatch(dispatchData) {
    //Requests the backend to register the data.
    return this._http.post<any>(this._registrationUrl, dispatchData);
  }
}

