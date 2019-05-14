import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit {
  text: string = "BPTG-70\t José Nuñez\t ha llegado a Patacón";
  constructor() { }

  ngOnInit() {
  }

}
