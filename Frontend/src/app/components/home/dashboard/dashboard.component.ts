import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lat: number = -35.0012238;
  lng: number = -71.2308186;
  shouldRun:boolean;


  constructor() { }

  ngOnInit() {
    this.shouldRun = true;
  }

}
