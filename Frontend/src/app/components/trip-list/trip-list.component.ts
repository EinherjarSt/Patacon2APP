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
    { start_id = "Patacon", end_id="Viña", trip_id = 0, status = "En tránsito hacia viña"},
    { end_id="Viña2", start_id = "Patacon", status = "En tránsito hacia viña", trip_id = 1}
  ];


  constructor() { }

  ngOnInit() {
  }

}
