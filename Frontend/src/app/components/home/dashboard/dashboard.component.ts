import {
  Component,
  OnInit,
  ElementRef,
  Input,
  OnDestroy,
  AfterContentInit,
  AfterViewInit
} from "@angular/core";
import { GpsService } from "../../../services/gps.service";
import { timer, Subscription } from "rxjs";
import { trigger, transition, animate, style } from "@angular/animations";
import { Filter } from "src/app/model-classes/filter";
declare const google: any;

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
  center: {
    latitude: number;
    longitude: number;
  } = {
    latitude: -35.0012238,
    longitude: -71.2308186
  };
  shouldRun: boolean;
  gpsPosition: any[];
  gpsKey: string[];
  @Input() public state: boolean = true;
  gpsTimer: Subscription;
  dispatchInfo: { [key : string] : {
    truckLicensePlate: string,
    driverName: string,
    driverPhoneNumber: string,
    dispatchStatus: string
  }};

  constructor(private gpsService: GpsService) {}

  ngOnInit() {
    this.shouldRun = true;
    this.gpsTimer = timer(3000, 5000).subscribe(() => {
      if (this.dispatchInfo && Object.entries(this.dispatchInfo).length !== 0) {
        let arrayGPS: string[] = Object.keys(this.dispatchInfo);
        console.log("call service getPositionOf " + JSON.stringify(arrayGPS));
        this.gpsService.getPositionOf(arrayGPS).subscribe({
          next: gpsPosition => {
            this.gpsKey = Object.keys(gpsPosition);
            this.gpsPosition = gpsPosition;
          },
          error: err => {
            console.log(err);
          }
        });
      }
      else{
        this.gpsKey = null;
        this.gpsPosition = null;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gpsTimer.unsubscribe();
    console.log(google);
  }

  protected get direction(): "right" | "left" {
    return this.state ? "right" : "left";
  }

  onMapReady(map) {
    console.log(google);
  }

  onMapClick(event) {
    console.log(event);
  }

  mapUpdate(data: Filter[]) {
    this.dispatchInfo = {};
    console.log(data);
    if (data){
      data.forEach(element => {
        this.dispatchInfo[element.truckGPSImei] = {
          truckLicensePlate: element.truckLicensePlate,
          driverName : element.driverName,
          driverPhoneNumber : element.driverPhoneNumber,
          dispatchStatus: element.dispatchStatus 
        }
      });
    }
  }
}
