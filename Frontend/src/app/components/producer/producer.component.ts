import { Component, OnInit, OnDestroy } from '@angular/core';
import { Truck } from 'src/app/model-classes/truck';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/model-classes/filter';
import { DispatchesService } from 'src/app/services/dispatches.service';
import { Router } from '@angular/router';
import { TrucksService } from 'src/app/services/trucks.service';
import { GpsService } from 'src/app/services/gps.service';
import { timer, Subscription } from "rxjs";
import {ProducerviewService} from 'src/app/services/producerview.service';



@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})

export class ProducerComponent implements OnInit , OnDestroy{
  lat: number = -35.0012238;
  lng: number = -71.2308186;
  lat2: number = -34.147774;
  lng2: number = -70.741592;
  info : Filter;
  data : Filter[];
  truck: Truck;
  dispatch_id : number;
  gpsPosition: any;
  gpsTimer: Subscription;

  constructor(private route: ActivatedRoute,
    private dispatchService: DispatchesService,
    public router: Router,
    private truckService: TrucksService,
    private gpsService: GpsService,
    private producerViewService: ProducerviewService) { 
      this.info= new Filter();
    }
    
  ngOnInit() {
    let id = this.producerViewService.decryptNumber(this.route.snapshot.paramMap.get('idDispatch'));
    console.log("decrypt:"+id);

    this.dispatch_id = id;
    this.dispatchService.getDispatchWithFullInfo(this.dispatch_id).subscribe(data=>{
      this.info = data
      if(this.info.producerName==null){
        this.router.navigate(['/not-found']);
      }
      else if(!this.verifyConditionsView(this.info)){
        this.router.navigate(['/not-found']);
      }
      let date = this.info.arrivalAtVineyardDatetime.toString().replace(/T/, ' ').replace(/\..+/, '').substr(11,16);
      this.info.arrivalAtVineyardDatetime = date;
    });

    this.gpsTimer = timer(3000, 15000).subscribe(() => {
      this.gpsService.getPositionOf([this.info.truckGPSImei]).subscribe(gpsPos =>{
        this.gpsPosition = gpsPos;
      });
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.gpsTimer.unsubscribe();
  }
  
  verifyConditionsView(filter :Filter){
    if(filter.truckGPSImei==null)return false;
    else if(filter.dispatchStatus=='Pendiente') return false;
    else if(filter.dispatchStatus=='Terminado') return false;
    return true;
  }
}
