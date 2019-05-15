import { Component, OnInit , ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import{ AddDriverComponent } from '../add-driver/add-driver.component';
import{ Driver} from '../../../../model-classes/driver';
import { DriversService} from '../../../../services/drivers.service';
import { EditDriverComponent } from '../edit-driver/edit-driver.component';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']

})

export class DriversListComponent implements OnInit {
  dialogResult ="";
  drivers: Driver[];
  displayedColumns: string[] = ['run','name','surname','surname2','phoneNumber','details','delete'];
  dataSource: MatTableDataSource<Driver>;

  constructor( private driversService : DriversService,public dialog: MatDialog) { 
   
  }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getAllDrivers();

  }
  getAllDrivers() {
      this.driversService.getAllDrivers().subscribe(data =>{
      this.drivers = data;
      this.dataSource = new MatTableDataSource<Driver>(this.drivers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }
public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {

  }
  openDialog():void {
    let dialogRef = this.dialog.open(AddDriverComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.ngOnInit();
    })
  }

  openUpdateDialog(run: string){
    const dialogRef = this.dialog.open(EditDriverComponent, {
      data: run,
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
}
