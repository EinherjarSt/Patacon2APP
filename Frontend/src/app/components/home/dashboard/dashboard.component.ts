import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { GpsService } from "../../../services/gps.service";
import { timer } from "rxjs";
import { ICON_REGISTRY_PROVIDER } from "@angular/material";
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
export class DashboardComponent implements OnInit {
  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = -34.147774;
  lng2: number = -70.741592;
  shouldRun: boolean;
  gpsPosition: any;
  gpsKey: string[];
  @Input() public state: boolean = true;

  constructor(private gpsService: GpsService) {}

  ngOnInit() {
    this.shouldRun = true;

    timer(3000, 5000).subscribe(() => {
      this.gpsService.getPositionOfAllGPS().subscribe({
        next: gpsPosition => {
          this.gpsKey = Object.keys(gpsPosition);
          this.gpsPosition = gpsPosition;
          console.log("timer");
        },
        error: err => {
          console.log(err);
        }
      });
    });
  }
  
  protected get direction(): "right" | "left" {
    return this.state ? "right" : "left";
  }
}
