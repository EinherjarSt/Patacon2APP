import {Component, Input,OnInit} from '@angular/core';
import {RouteService} from 'src/app/services/route.service';
import {  MatDialog, MatDialogConfig} from '@angular/material';
import {InfoRoute} from 'src/app/model-classes/infoRoute';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import {Location} from 'src/app/model-classes/location';
import { trigger, transition, animate, style } from "@angular/animations";
import {ConfirmationDialogComponent} from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { NotifierService } from 'angular-notifier';
import {Route} from 'src/app/model-classes/route';
declare const google: any;

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
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
export class RoutesComponent implements OnInit {
  center: {
    latitude: number,
    longitude: number
  } = {
    latitude: -35.0012238,
    longitude: -71.2308186
  }
  private readonly notifier: NotifierService;
  shouldRun: boolean;
  overviewPath;
  map;
  directionsDisplay;
  routesInfo: InfoRoute[];
  locationOptions: Location[];
  producers: InfoRoute[];
  panelVisible = false;
  locationField = true;
  producerField = false;
  btnAddRoute2 = true;
  editRoute = false;
  locationName;
  producerName;
  idLocation;
  selectedProducer: number;
  selectedLocation: number;
  textBtn = "Agregar";
   @Input() public state: boolean = true;

  registerRouteForm: FormGroup = this.formBuilder.group({
    ref_producer: ['', [Validators.required]],
    ref_location: ['', [Validators.required]]
  });

  endSelect = {
    name: 'Patacon',
    location: '-35.0782921, -71.2601285'
  };

  selectedValue = null;

  constructor(private routeService: RouteService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.shouldRun = true;
    this.getProducersWithRoutes();
    this.getProducersWithoutRoutes();
  }

  getProducersWithRoutes() {
    this.routeService.getRoutesInfo().subscribe(data => {
      this.routesInfo = data;
    });
  }
  getProducersWithoutRoutes() {
    this.routeService.getProducersWithoutRoutes().subscribe(data => {
      this.producers = data;
      console.log(data);
    });
  }

  changeOptions(pr: InfoRoute) {
    this.locationOptions = pr.locations;
    this.locationField = false;
  }

  onMapReady(map) {
    this.map = map;
    let $this = this;
    google.maps.event.addListener(map, 'click', function (event) {
      $this.onMapClick(event, map);
    });
  }

  initMap(map, origin, destination, waypoints: {
    location: string
  } [] = null, draggable = false) {
    var directionsService = new google.maps.DirectionsService;
    if (!this.directionsDisplay) {
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      let $this: RoutesComponent = this;

      // How it is a callback the context of this change.
      this.directionsDisplay.addListener('directions_changed', function () {
        //$this.computeTotalDistance($this.directionsDisplay.getDirections());
        console.log("direction");
        console.log($this.directionsDisplay.getDirections());
        $this.some_method($this.directionsDisplay);
      });
    }
    this.directionsDisplay.setOptions({
      draggable,
      map
    });

    if (origin != undefined && destination != undefined) {
      this.displayRoute(origin, destination, directionsService,
        this.directionsDisplay, waypoints);
    }

  }

  some_method = function (display) {
    var waypoints = display.directions.routes[0].legs[0].via_waypoint;
    this.overviewPath = display.getDirections().routes[0].overview_path;
    console.log(waypoints);
  };

  displayRoute(origin, destination, service, display, waypoints: {
    location: string
  } []) {
    service.route({
      origin: origin,
      destination: destination,
      waypoints,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  /*
  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }
*/
  onMapClick(event, map) {
    console.log(event);
    let marker1 = new google.maps.Marker({
      map: map,
      draggable: true,
      position: event.latLng
    });

    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
    var cascadiaFault = new google.maps.Polyline({
      path: this.overviewPath
    });
    if (google.maps.geometry.poly.isLocationOnEdge(event.latLng, cascadiaFault, 1e-3)) {
      console.log(1e-4);
      console.log("Is in route")
    }

    //cascadiaFault.setMap(map);
  }

  selectChange(event) {
    console.log(event);
    this.initMap(this.map, event, this.endSelect.location);
  }

  addRoute() {
    let position = this.directionsDisplay.directions.routes[0].legs[0];
    let route = {
      start_position: {
        lat: position.start_location.lat(),
        lng: position.start_location.lng()
      },
      end_position: {
        lat: position.end_location.lat(),
        lng: position.end_location.lng()
      },
      waypoint: []
    }

    for (const key in position.via_waypoints) {
      route.waypoint[key] = {
        location: position.via_waypoints[key].lat() + ", " + position.via_waypoints[key].lng(),
        'stopover':false 
      };
    }

    let $this = this;
    const routeStr = JSON.stringify(route);
    this.routeService.addRoute(this.registerRouteForm.value, routeStr).subscribe(
      response => {
        this.notifier.notify('info', 'Ruta agregada exitosamente');
        $this.updateData();
        this.directionsDisplay.setMap(null);
      },
      error => {
        this.notifier.notify('error', 'Error: No se ha podido agregar la ruta');
        console.error('Error', error)});

    this.panelVisible = false;
    this.routesInfo = null;
  }

  updateData() {
    this.routesInfo = [];
    this.producers = [];
    this.getProducersWithRoutes();
    this.getProducersWithoutRoutes();
  }

  clickItem(idLocation) {
    this.routeService.getRoute(idLocation).subscribe(rt => {
      let route: Route;
      route = rt;
      let json = JSON.parse(route.routes);
      this.initMap(this.map, json.start_position, json.end_position, json.waypoint, false);
    });
    this.panelVisible = false;
  }

  clickEdit(event: Event, location, producer) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.panelVisible) this.panelVisible = false;
    else this.panelVisible = true;

    this.textBtn = "Editar";
    this.locationName = location.address;
    this.idLocation = location.id_location;
    this.producerName = producer.producerName;
    this.editRoute = true;

    this.locationField = true;
    this.btnAddRoute2 = false;
    this.producerField = true;

    this.routeService.getRoute(location.id_location).subscribe(rt => {
      let route: Route;
      route = rt;
      let json = JSON.parse(route.routes);
      this.initMap(this.map, json.start_position, json.end_position, json.waypoint, true);
    });
  }


  actionEdit(idLocation){
    let position = this.directionsDisplay.directions.routes[0].legs[0];
    let route = {
      start_position: {
        lat: position.start_location.lat(),
        lng: position.start_location.lng()
      },
      end_position: {
        lat: position.end_location.lat(),
        lng: position.end_location.lng()
      },
      waypoint: []
    }

    for (const key in position.via_waypoints) {
      route.waypoint[key] = {
        location: position.via_waypoints[key].lat() + ", " + position.via_waypoints[key].lng(),
        'stopover':false 
      };
    }

    let $this = this;
    const routeStr = JSON.stringify(route);
    $this = this;
    this.routeService.updateRoute(idLocation,routeStr).subscribe(res =>{
      this.notifier.notify('info', 'Ruta modificada exitosamente');
      $this.updateData();
      this.directionsDisplay.setMap(null);
    },error=>{
      this.notifier.notify('error', 'Error: No se ha podido modificar la ruta');
    });

    this.panelVisible = false;
    this.routesInfo = null;
  }

  clickDelete(event: Event, idLocation) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let $this = this;
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.routeService.deleteRoute(idLocation).subscribe(res => {
          $this.updateData();
          this.directionsDisplay.setMap(null);
          this.notifier.notify('info', 'La ruta ha sido eliminada');
        }, err => {
          this.notifier.notify('error', 'Error: La ruta no ha podido ser eliminada');
        });
      }
    }, err => {
      
    });
  }

  changeState() {
    if (this.panelVisible) {
      this.panelVisible = false;
    } else {
      this.panelVisible = true;
    }
    this.directionsDisplay.setMap(null);
    this.textBtn = "Agregar";
    this.getProducersWithoutRoutes();
    this.editRoute = false;
    this.locationOptions = null;
    this.btnAddRoute2 = true;
    this.locationField = true;
    this.producerField = false;

  }

  showRoute(location) {
    this.btnAddRoute2 = false;
    let origin = "" + location.latitude + "," + location.longitude + "";
    this.initMap(this.map, origin, this.endSelect.location, null, true);

  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = {
      message: '¿Desea eliminar esta ruta?'
    };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerRouteForm.get(controlName).hasError(errorName);
  }
  protected get direction(): "right" | "left" {
    return this.state ? "right" : "left";
  }
}
