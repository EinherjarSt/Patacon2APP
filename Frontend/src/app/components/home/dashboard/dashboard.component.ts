import { Component, OnInit, ElementRef, Input, OnDestroy, AfterContentInit, AfterViewInit } from "@angular/core";
import { GpsService } from "../../../services/gps.service";
import { timer, Subscription } from "rxjs";
import { trigger, transition, animate, style } from "@angular/animations";
import { Filter } from 'src/app/model-classes/filter';
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

  center: {latitude: number, longitude: number} = {
    latitude: -35.0012238,
    longitude: -71.2308186
  }
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
    console.log(google);

  }

  protected get direction(): "right" | "left" {
    return this.state ? "right" : "left";
  }

  onMapReady(map) {
    console.log(google);
    this.test(map);
  }

  test(map) {
    var myPosition = new google.maps.LatLng(-35.00497635127293, -71.22463595744193);
    
    console.log(map);  

    let lat1 = -35.00042518983109
    let lng1 = -71.23304954396099

    let lat2 = -35.00208372175814
    let lng2 = -71.22772363815693

    let lat3 = -35.002622977513425
    let lng3 = -71.22668236988517

    let lat4 = -35.00540674996493
    let lng4 = -71.2242229481555

    let lat5 = -35.00469477727525
    let lng5 = -71.22482570046236
    var cascadiaFault = new google.maps.Polyline({
      path: [
        new google.maps.LatLng(lat1, lng1),
        new google.maps.LatLng(lat2, lng2),
        new google.maps.LatLng(lat3, lng3),
        new google.maps.LatLng(lat4, lng4)
        //new google.maps.LatLng(lat5, lng5)
      ]
    });
  
    //var marker = new google.maps.Marker({position: myPosition, map: map});

    //cascadiaFault.setMap(map);
  
    if (google.maps.geometry.poly.isLocationOnEdge(myPosition, cascadiaFault, 1e-4)) {
      console.log(1e-4);
      console.log("Is in route")
    }
  }

  onMapClick(event){
    console.log(event);
  }

  mapUpdate(event: Filter[]){
    
  }
  
}
