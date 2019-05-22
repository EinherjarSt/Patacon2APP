import { Component, OnInit, ElementRef, Input, OnDestroy } from "@angular/core";
import { GpsService } from "../../../services/gps.service";
import { timer, Subscription } from "rxjs";
import { trigger, transition, animate, style } from "@angular/animations";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  animations: [
    trigger("direction", [
      transition("right <=> left", [
        style({
          transform: "scale(1,5)",
          opacity: 0
        }),
        animate(".2s 0s ease-out")
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = -34.147774;
  lng2: number = -70.741592;
  shouldRun: boolean;
  gpsPosition: any;
  gpsKey: string[];
  @Input() public state: boolean = true;
  gpsTimer: Subscription;

  constructor(private gpsService: GpsService) {}

  ngOnInit() {
    this.shouldRun = true;

    this.gpsTimer = timer(3000, 5000).subscribe(() => {
      this.gpsService.getPositionOfAllGPS().subscribe({
        next: gpsPosition => {
          this.gpsKey = Object.keys(gpsPosition);
          this.gpsPosition = gpsPosition;
        },
        error: err => {
          console.log(err);
        }
      });
    });
  }
  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gpsTimer.unsubscribe();
  }

  protected get direction(): "right" | "left" {
    return this.state ? "right" : "left";
  }
}
