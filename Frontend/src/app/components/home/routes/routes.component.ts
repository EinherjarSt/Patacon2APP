import {Component, OnInit} from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { InfoRoute } from 'src/app/model-classes/infoRoute';
import { Location } from 'src/app/model-classes/location';
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
  routesInfo:InfoRoute[];
  locationOptions: Location[];
  producers :InfoRoute[];
  panelVisible = false;
  locationField = true;
  btnAddRoute2 = true;

  startSelect = [{
      name: 'Inversiones El Cortijo',
      location: "Unnamed Road, Peumo, Región del Libertador Gral. Bernardo O’Higgins"
    },
    {
      name: 'AGR. Y FRUT. LA ESPERANZA',
      location: "Unnamed Road, Peumo, Región del Libertador Gral. Bernardo O’Higgins"
    },
    {
      name: 'AGR. SAN EDUARDO',
      location: "-34.6508629, -71.3846474"
    },
    {
      name: 'AGR. Santa Elvira  (Chapeta Correa) Tintorera',
      location: "Unnamed Road, Santa Cruz, Región del Libertador Gral. Bernardo O’Higgins"
    },
    {
      name: 'AGR. LA PATAGUILLA  (Chapeta Correa)',
      location: "I-742, Santa Cruz, Región del Libertador Gral. Bernardo O’Higgins"
    }
  ];

  endSelect = {
    name: 'Patacon',
    location: '-35.0782921, -71.2601285'
  };

  selectedValue = null;

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.shouldRun = true;
    this.routeService.getRoutesInfo().subscribe(data=>{
      
      this.routesInfo = data;
      
    });
    this.getProducersWithoutRoutes();
  }

  getProducersWithoutRoutes(){
    this.routeService.getProducersWithoutRoutes().subscribe( data =>{
      this.producers = data;
      console.log(data);
    });
  }

  changeOptions(pr:InfoRoute){
    this.locationOptions = pr.locations;
    this.locationField =false;
  }

  onMapReady(map) {
    console.log(google);
    this.map = map;
    let $this = this;
    google.maps.event.addListener(map, 'click', function (event) {
      $this.onMapClick(event, map);
    });
  }

  initMap(map, origin, destination) {
    var directionsService = new google.maps.DirectionsService;
    if (!this.directionsDisplay) {
      this.directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
      });
      
      let $this: RoutesComponent = this;

      // How it is a callback the context of this change.
      this.directionsDisplay.addListener('directions_changed', function () {
        $this.computeTotalDistance($this.directionsDisplay.getDirections());
        console.log("direction");
        console.log($this.directionsDisplay.getDirections());
        $this.some_method($this.directionsDisplay);
      });
    }

    if (origin != undefined && destination != undefined) {
      this.displayRoute(origin, destination, directionsService,
        this.directionsDisplay);
    }

  }

  some_method = function (display) {
    var waypoints = display.directions.routes[0].legs[0].via_waypoint;
    this.overviewPath = display.getDirections().routes[0].overview_path;
    console.log(waypoints);
    console.log(waypoints[0].location.lat());
    console.log(waypoints[0].location.lng());
  };

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      waypoints: [],
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
  }

  selectChange(event) {
    console.log(event);
    this.initMap(this.map, event, this.endSelect.location);
  }

  clickItem(idLocation){
    //LLAMAR FUNCION PARA OBTENER RUTA POR IDLOCATION
    //MOSTRAR MAPA
    this.panelVisible =false;
    console.log("ITEM");
  }

  clickEdit(event: Event,idLocation){
    event.preventDefault();
    event.stopImmediatePropagation();

     //LLAMAR FUNCION PARA OBTENER RUTA POR IDLOCATION
    //MOSTRAR MAPA PARA EDITAR

    console.log("EDITAR");
  }

  clickDelete(event: Event,idLocation){
    event.preventDefault();
    event.stopImmediatePropagation();

    //LLAMAR FUNCION PARA ELIMINAR RUTA
    console.log("ELIMINAR");
  }

  changeState(){
    if(this.panelVisible) this.panelVisible =false;
    else this.panelVisible = true;
    //ELIMINAR RUTAS DIBUJADAS
  }

  showRoute(location){
    this.btnAddRoute2 =false;

    let origin = ""+location.latitude + "," + location.longitude+"";
    console.log(origin);
    this.initMap(this.map,origin,this.endSelect.location);

  }
}
