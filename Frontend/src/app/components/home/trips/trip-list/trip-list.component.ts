import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSortBase, MatPaginator } from '@angular/material';

import { MatDialog, MatDialogConfig } from "@angular/material";
import { Trip } from '../../../../model-classes/trip'
import { TripsService } from '../../../../services/trips.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { AddTripComponent } from '../add-trip/add-trip.component';


/**
 * @title Table with sorting
 */
@Component({
  selector: 'trip-list',
  styleUrls: ['trip-list.component.css'],
  templateUrl: 'trip-list.component.html',
})
export class TripListComponent implements OnInit {

  trips: Trip[];
  displayedColumns: string[] = ["status", "shipment", "date", "departure_time", "arrival_time", "details", "delete"];
  dataSource: MatTableDataSource<Trip>;



  constructor(private tripService: TripsService, private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTrips();
    this.dataSource = new MatTableDataSource(this.trips);
    this.dataSource.sort = this.sort;
  }

  getTrips(): void {
    this.trips = this.tripService.getTrips();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddTripComponent, dialogConfig);
  }
}

/*
export class TripDataSource extends DataSource<any> {
  constructor(private tripService: TripsService){
    super();
  }
  
  connect(): Observable<Trip[]> {
    return this.tripService.getTrips();
  }

  disconnect(){

  }
}
*/



