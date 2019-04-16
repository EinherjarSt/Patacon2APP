import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Trip} from '../../model-classes/trip'

const TRIPS: Trip[] = [
  {
    code: "0", status: "En tránsito", shipment: "UVA",
    departure_point: "patacon", arrival_point: "Viña", date: "03/06/2018",
    departure_time: "14:20", arrival_time: "17:30"
  },
  {
    code: "0", status: "Cargando", shipment: "UVA",
    departure_point: "Viña", arrival_point: "patacon", date: "04/06/2018",
    departure_time: "18:20", arrival_time: "21:30"
  },
  {
    code: "0", status: "En tránsito", shipment: "UVA",
    departure_point: "Viña 2", arrival_point: "patacon", date: "01/06/2018",
    departure_time: "14:20", arrival_time: "17:30"
  }

];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'trip-list',
  styleUrls: ['trip-list.component.css'],
  templateUrl: 'trip-list.component.html',
})
export class TripListComponent implements OnInit {
  displayedColumns: string[] = ["status", "shipment", "date", "departure_time", "arrival_time"];
  dataSource = new MatTableDataSource(TRIPS);

  selected_status = []

  constructor() {}


  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  handleStatusCheckBoxChange(event) {
    var source_checkbox = event.source.id;
    var status;

    console.log("Source element: " + source_checkbox);
    console.log(this.selected_status);
    if(source_checkbox === "enTransitoCheckBox") {
      status = "En tránsito";
    }
    else if (source_checkbox === "detenidoCheckBox"){
      status = "Detenido";
    }
    else {
      status = "Cargando";
    }

    if (event.checked === true) {
      this.selected_status = this.selected_status.concat(status)
    }
    else {
      this.selected_status = this.selected_status.filter(selected_status => !(selected_status === status));
    }
  }

}







/*import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../../model-classes/trip';


@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  public selectable_status: String[] = ["En tránsito", "Cargando", "Detenido"]
  
  //Filtering properties
  @Input() public selected_status:String[];


  //Dummy data
  TRIPS: Trip[] = [
    {
      code: "0", status: "En tránsito", shipment: "UVA",
      departure_point: "patacon", arrival_point: "Viña", date: "03/06/2018",
      departure_time: "14:20", arrival_time: "17:30"
    },
    {
      code: "0", status: "Cargando", shipment: "UVA",
      departure_point: "Viña", arrival_point: "patacon", date: "04/06/2018",
      departure_time: "18:20", arrival_time: "21:30"
    },
    {
      code: "0", status: "En tránsito", shipment: "UVA",
      departure_point: "Viña 2", arrival_point: "patacon", date: "01/06/2018",
      departure_time: "14:20", arrival_time: "17:30"
    }

  ];


  constructor() {
    this.selected_status = [];
   }

   
  ngOnInit() {
  }

  handleStatusCheckBoxChange(event) {
    var source_checkbox = event.currentTarget.id;
    var status;

    console.log("Source element: " + source_checkbox);
    console.log(this.selected_status);
    if(source_checkbox === "enTransitoCheckBox") {
      status = "En tránsito";
    }
    else if (source_checkbox === "detenidoCheckBox"){
      status = "Detenido";
    }
    else {
      status = "Cargando";
    }

    if (event.target.checked === true) {
      this.selected_status = this.selected_status.concat(status)
    }
    else {
      this.selected_status = this.selected_status.filter(selected_status => !(selected_status === status));
    }
  }

}*/