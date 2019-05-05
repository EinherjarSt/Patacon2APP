import { Component, OnInit , ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import{ AddDriverComponent } from '../add-driver/add-driver.component';
import{ Driver} from '../../../../model-classes/driver';
import { DriversService} from '../../../../services/drivers.service';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']

})

export class DriversListComponent implements OnInit {
  dialogResult ="";
  drivers: Driver[];
  displayedColumns: string[] = ['run','name','lastName1','lastName2','phoneNumber','details','delete'];
  dataSource: MatTableDataSource<Driver>;
  constructor( private driversService : DriversService,public dialog: MatDialog) { 
    driversService.getData().subscribe(data =>{
      this.drivers = data;
      this.dataSource = new MatTableDataSource<Driver>(this.drivers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }
public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {

  }
  openDialog():void {
    this.dialog.open(AddDriverComponent, {
      width: '400px'
    });
  }
}
