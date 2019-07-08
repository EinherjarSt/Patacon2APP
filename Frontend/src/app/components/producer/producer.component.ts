import { Component, OnInit, OnDestroy } from '@angular/core';
import { Truck } from 'src/app/model-classes/truck';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/model-classes/filter';
import { DispatchesService } from 'src/app/services/dispatches.service';
import { Router } from '@angular/router';
import { TrucksService } from 'src/app/services/trucks.service';
import { GpsService } from 'src/app/services/gps.service';
import { timer, Subscription } from "rxjs";
import { ProducerviewService } from 'src/app/services/producerview.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { isNumber } from 'util';
import { InsightsService } from '../../services/insights.service';


@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})

export class ProducerComponent implements OnInit, OnDestroy {
  center: {
    latitude: number;
    longitude: number;
  } = {
      latitude: -35.0012238,
      longitude: -71.2308186
    };
  info: Filter;
  data: Filter[];
  truck: Truck;
  dispatch_id: number;
  gpsPosition: any;
  gpsTimer: Subscription;

  constructor(private route: ActivatedRoute,
    private dispatchService: DispatchesService,
    public router: Router,
    private truckService: TrucksService,
    private gpsService: GpsService,
    private producerViewService: ProducerviewService,
    private insightsService: InsightsService) {
    this.info = new Filter();
   }

  ngOnInit() {
    let id = this.producerViewService.decryptNumber(this.route.snapshot.paramMap.get('idDispatch'));
    console.log("decrypt:" + id);
    this.dispatch_id = id;
    this.dispatchService.getDispatchWithFullInfo(this.dispatch_id).subscribe(data => {
      this.info = data

      if (this.info == null) {
        this.router.navigate(['/not-found']);
        return;
      }
      
      else if(!this.verifyConditionsView(this.info)){
        this.router.navigate(['/not-found']);
        return;
      }
      else if(this.info.dispatchStatus=='Terminado' || this.info.dispatchStatus=='En patio' || 
      this.info.dispatchStatus=='Cancelado' || this.info.dispatchStatus=='En camino a Patacon'){
        this.router.navigate(['/not-found']);
        return;
      }
      let date = this.info.arrivalAtVineyardDatetime.toString().replace(/T/, ' ').replace(/\..+/, '').substr(11,16);
      else if (!this.verifyConditionsView(this.info)) {
        this.router.navigate(['/not-found']);
        return;
      }
      
      this.incrementVisitsCounter(this.dispatch_id);

      let date = this.info.arrivalAtVineyardDatetime.toString().replace(/T/, ' ').replace(/\..+/, '').substr(11, 16);
      this.info.arrivalAtVineyardDatetime = date;
    }, err => {
      this.router.navigate(['/not-found']);
    });

    this.gpsTimer = timer(3000, 15000).subscribe(() => {
      this.gpsService.getPositionOf([this.info.truckGPSImei]).subscribe(gpsPos => {
        this.gpsPosition = gpsPos;
        console.log(this.gpsPosition);
      });
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gpsTimer.unsubscribe();
  }

  public incrementVisitsCounter(dispatch_id) {
    this.insightsService.incrementVisitsCounter(dispatch_id).subscribe(data => console.log('Lo logré'))

  }

  verifyConditionsView(filter: Filter) {
    if (filter.truckGPSImei == null) return false;
    else if (filter.dispatchStatus == 'Pendiente') return false;
    else if (filter.dispatchStatus == 'Terminado') return false;
    return true;
  }
}
