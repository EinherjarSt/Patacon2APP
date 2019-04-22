import { Injectable } from '@angular/core';
import { Trip } from '../model-classes/trip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private dataUrl = 'http://localhost:1234/fake_trips_data.json';
  TRIPS:Trip[] = [
    {code: "1", status: "EN TRANSITO", shipment : "CARIG", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "2", status: "EN TRANSITO", shipment : "CHARD", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "20/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "3", status: "EN TRANSITO", shipment : "TTRO", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "13/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "4", status: "DETENIDO", shipment : "SEMILLON", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "11/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "5", status: "DESCARGANDO", shipment : "SEMILLON", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "11/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "6", status: "DETENIDO", shipment : "TTRO", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "10/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "7", status: "DESCARGANDO", shipment : "CARIG", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/07/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "8", status: "DETENIDO", shipment : "CHARD", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/05/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "9", status: "EN TRANSITO", shipment : "CHARD", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/08/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "10", status: "TERMINADO", shipment : "TTRO", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/09/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "1", status: "DETENIDO", shipment : "CARIG", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/10/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "1", status: "TERMINADO", shipment : "SEMILLON", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/11/2019", departure_time: "13:12", arrival_time: "22:30" },
    {code: "1", status: "EN TRANSITO", shipment : "SEMILLON", departure_point :"JORGE AMENABAR", arrival_point : "PATACON", date: "16/09/2019", departure_time: "13:12", arrival_time: "22:30" },


    
  ]
 
  constructor() {}

    /*
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.dataUrl);
  }
  */

  getTrips() {
    return this.TRIPS;
  }
}

