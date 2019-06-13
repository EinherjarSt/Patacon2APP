import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event} from 'src/app/model-classes/event';
import { DashboardService } from 'src/app/services/dashboard.service';
import { timer, Subscription } from "rxjs";

@Component({
  selector: 'app-latest-events',
  templateUrl: './latest-events.component.html',
  styleUrls: ['./latest-events.component.css']
})
export class LatestEventsComponent implements OnInit, OnDestroy {
  events: Event[];
  lastEventTimer: Subscription;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.lastEventTimer = timer(1000,20000).subscribe(() => {
      this.dashboardService.getAllEvents().subscribe(data =>{
        this.events = data
      });
    });
  }

  isWarning(element):boolean{
    if(element && element.substr(0,1)=='¡'){
      return true;
    }
    else{
      return false;
    }
  }
  
  showDispach(id){
    //OPEN DISPATCH WINDOW
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.lastEventTimer.unsubscribe();
  }
}
