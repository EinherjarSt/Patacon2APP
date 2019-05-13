import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GpsService } from '../../../services/gps.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = -34.147774;
  lng2: number = -70.741592;
  shouldRun:boolean;
  gpsPosition: any;
  gpsKey:string [];

  constructor(private gpsService: GpsService) { }

  ngOnInit() {
    this.shouldRun = true;

    timer(3000, 5000).subscribe( () => {
      this.gpsService.getPositionOfAllGPS().subscribe({
        next: (gpsPosition) => {
          this.gpsKey = Object.keys(gpsPosition);
          this.gpsPosition = gpsPosition;
          console.log("timer");
        },
        error: (err) => {
          console.log(err);
        }
      })
    });
  }
}
