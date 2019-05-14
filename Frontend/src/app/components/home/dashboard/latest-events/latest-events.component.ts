import { Component, OnInit } from '@angular/core';
import { Event} from 'src/app/model-classes/event';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit {
  events: Event[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getAllEvents().subscribe(data =>{
      console.log(data);
      this.events = data;
    });
  }

}
