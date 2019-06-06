import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InfoRoute } from 'src/app/model-classes/infoRoute';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from 'src/app/model-classes/location';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { Producer } from 'src/app/model-classes/producer';
import { Route } from 'src/app/model-classes/route';
declare const google: any;

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  center: {
    latitude: number,
    longitude: number
  } = {
      latitude: -35.0012238,
      longitude: -71.2308186
    }
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
  selectedProducer: number;
  selectedLocation: number;
  textBtn = "Agregar";

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
    public dialog: MatDialog) { }

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
    console.log(google);
    this.map = map;
    let $this = this;
    google.maps.event.addListener(map, 'click', function (event) {
      $this.onMapClick(event, map);
    });
  }

  initMap(map, origin, destination, waypoints: {lat: number, lng: number}[] = null , draggable = false) {
    var directionsService = new google.maps.DirectionsService;
    if (!this.directionsDisplay) {
      this.directionsDisplay = new google.maps.DirectionsRenderer();

      let $this: RoutesComponent = this;

      // How it is a callback the context of this change.
      this.directionsDisplay.addListener('directions_changed', function () {
        $this.computeTotalDistance($this.directionsDisplay.getDirections());
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
    console.log(waypoints[0].location.lat());
    console.log(waypoints[0].location.lng());
  };

  displayRoute(origin, destination, service, display, waypoints: {lat: number, lng: number}[]) {
    service.route({
      origin: origin,
      destination: destination,
      waypoints,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
  }

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

    cascadiaFault.setMap(map);
  }

  selectChange(event) {
    console.log(event);
    this.initMap(this.map, event, this.endSelect.location);

  }

  addRoute() {
    console.log("AKI");
    let position = this.directionsDisplay.directions.routes[0].legs[0];
    console.log(position);
    let route = {
      start_position:{
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
        lat: position.via_waypoints[key].lat(),
        lng: position.via_waypoints[key].lng(),
      }
    }

    console.log(route);
    const routeStr = JSON.stringify(route);
    this.routeService.addRoute(this.registerRouteForm.value,routeStr).subscribe(
      response => console.log('Success', response),
      error => console.error('Error', error));

    this.panelVisible = false;
    this.routesInfo =null;
    this.updateData();
  }

  updateData(){
    this.routesInfo =[];
    this.producers = [];
    this.getProducersWithRoutes();
    this.getProducersWithoutRoutes();
  }

  clickItem(idLocation) {
    console.log(idLocation);
    this.routeService.getRoute(idLocation).subscribe(rt =>{
      let route:Route;
      route = rt;
      let json = JSON.parse(route.routes);

      this.initMap(this.map,json.start_position,json.end_position,json.waypoint,false);
    })
    //LLAMAR FUNCION PARA OBTENER RUTA POR IDLOCATION
    //MOSTRAR MAPA
    this.panelVisible = false;
    console.log("ITEM");
  }

  clickEdit(event: Event, location, producer) {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (this.panelVisible) this.panelVisible = false;
    else this.panelVisible = true;
    this.textBtn = "Editar";
    this.locationName = location.address;
    this.producerName = producer.producerName;
    this.editRoute = true;
    this.registerRouteForm.setValue({
      ref_producer: producer.producerName,
      ref_location: location.address
    });


    this.locationField = true;
    this.btnAddRoute2 = false;
    this.producerField = true;

    //LLAMAR FUNCION PARA OBTENER RUTA POR IDLOCATION
    //MOSTRAR MAPA PARA EDITAR

    console.log("EDITAR");
  }

  clickDelete(event: Event, idLocation) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.routeService.deleteRoute(idLocation).subscribe(res => {
          console.log(res);
        });
      }
    },e=>{},()=>{
      this.updateData();
    });
  }

  changeState() {
    if (this.panelVisible){
       this.panelVisible = false;
       this.directionsDisplay.setMap(null);
      }
    else{
      this.panelVisible = true;
      
    }
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
    console.log(origin);
    this.initMap(this.map, origin, this.endSelect.location, null, true);

  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar esta ruta?' };
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
}
