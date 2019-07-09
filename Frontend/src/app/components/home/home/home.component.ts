import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DispatchDetailsComponent } from '../dashboard/dispatch-details/dispatch-details.component'
import { Event} from 'src/app/model-classes/event';
import { DashboardService } from 'src/app/services/dashboard.service';
import { timer, Subscription } from "rxjs";
import { DispatchesService } from '../../../services/dispatches.service';


declare interface RouteInfo{
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'usuarios', title: 'Usuarios',icon: 'people', class: '' },
  { path: 'camiones', title: 'Camiones',icon: 'local_shipping', class: '' },
  { path: 'choferes', title: 'Choferes',icon: '', class: '' },
  { path: 'productores', title: 'Productores',icon: 'nature_people', class: '' },
  { path: 'gps', title: 'GPS',icon: 'near_me', class: '' },
  { path: 'planificacion', title: 'Planificación',icon: 'table_chart', class: '' },
  { path: 'routes', title: 'Rutas',icon: 'directions', class: '' },


];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[];
  lastEventTimer: Subscription;
  menuItems: any[];
  userType : String;
  eventNotRead: number[] =[];
  countEventNotRead: number=0;
  readEvents: number[] =[];
  activateAnimation = false;

  constructor(private auth:AuthService, 
    private router:Router,
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private _dispatchesService: DispatchesService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.userType = this.auth.getUserType();
    this.lastEventTimer = timer(1000,15000).subscribe(() => {
      this.dashboardService.getNevents(18).subscribe(data =>{
        this.events = data
      },e=>{},()=>{
        if(this.activateAnimation){ 
          this.animateCSS('.bell','tada',()=>{});
          this.playAudio();
        }

        for (let i = 0; i < this.events.length; i++) {
          const event = this.events[i];

          if(!this.readEvents.includes(event.id_event)){
            if(!this.eventNotRead.includes(event.id_event)){
              if(event.description.substr(0,1)==='¡' && !this.activateAnimation){
                this.activateAnimation =true;
                this.animateCSS('.bell','tada',()=>{});
                this.playAudio();
              }
              this.eventNotRead.push(event.id_event);
              console.log(event.id_event);
              this.countEventNotRead ++;
              
            }
          }
        }
      });

    });
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['login']);
    this.lastEventTimer.unsubscribe();
  }

  configureAccount(){
    let tokenInfo = this.auth.getTokenInfo();
    let run:String = tokenInfo.run;
    this.router.navigate(['inicio/configcuenta/'+run]);
  }
  isWarning(element):boolean{
    if(element && element.substr(0,1)=='¡'){
      return true;
    }
    else{
      return false;
    }
  }
  
  showDispatch(id){
    var dialogConfig = this.getDialogConfig();
    this._dispatchesService.getDispatchWithFullInfo(id).subscribe(res =>{
      dialogConfig.data = res;
      this.dialog.open(DispatchDetailsComponent, dialogConfig);
    }
      ,err=>{
        console.log("error al cargar detalles")
      });
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  changeRead(){
    this.countEventNotRead =null;
    this.eventNotRead = [];
    this.activateAnimation = false;
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      this.readEvents.push(event.id_event);
    }
  }

  animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }

  playAudio(){
    let audio = new Audio("../../../../assets/sounds/alerta.wav");
    audio.load();
    
    let promise = audio.play();
    if(promise!==null){
      promise.catch(()=>{
        console.log("Audio bloqueado");
        })
    }
  }
  
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.lastEventTimer.unsubscribe();
  }

}
