import { Component, OnInit } from '@angular/core';
import { Event} from 'src/app/model-classes/event';
import { DashboardService } from 'src/app/services/dashboard.service';
import { timer } from "rxjs";

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit {
  events: Event[];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    timer(1000,20000).subscribe(() => {
      this.dashboardService.getAllEvents().subscribe(data =>{
        this.events = data
      });
    });
  }

  isWarning(element):boolean{
    if(element.substr(0,1)=='¡'){
      return true;
    }
    else{
      return false;
    }
  }
  showDispach(id){
    //OPEN DISPATCH WINDOW
  }
}
