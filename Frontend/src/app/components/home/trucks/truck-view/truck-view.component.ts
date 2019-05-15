import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { AddTruckComponent } from '../add-truck/add-truck.component';
import { TrucksService } from '../../../../services/trucks.service';
import { Truck } from '../../../../model-classes/truck';

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class TruckViewComponent implements OnInit {

  dialogResult="";
  trucks: Truck[];
  displayedColumns: string[] = ["licencePlate","brand","model","year", "details", "delete"];
  dataSource: MatTableDataSource<Truck>;

  constructor( private trucksService : TrucksService,public dialog: MatDialog) { 
    trucksService.getAllTrucks().subscribe(data =>{
      this.trucks = data;
      this.dataSource = new MatTableDataSource<Truck>(this.trucks);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTruckComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    
  }

}

