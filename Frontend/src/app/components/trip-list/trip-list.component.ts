import { Component, OnInit } from '@angular/core';
import { Trip } from '../../model-classes/trip';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  //Dummy data
  TRIPS: Trip[] = [
    { id : "0", start_point : "Patacon", end_point :  "Vina", status : "En tránsito hacia viña"},
    { id : "1", start_point : "Viña", end_point :  "Patacon", status : "En tránsito hacia Patacon"},
    { id : "2", start_point : "Viña 3", end_point :  "Patacon", status : "Descargando"},
  ];


  constructor() { }

  ngOnInit() {
  }

}