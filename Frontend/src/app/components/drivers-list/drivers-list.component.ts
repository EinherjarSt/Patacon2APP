import { Component, OnInit , ViewChild} from '@angular/core';

import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
export interface Driver {
  run: string;
  name: string;
  lastName1: string;
  lastName2: string;
  phoneNumber: string;
}

const datos: Driver[] = [
  {run: "12883941-2", name: 'Pedro', lastName1: "Perez", lastName2: "García", phoneNumber: "998237376"},
  {run: "19299034-2", name: 'Juan', lastName1: "Ibarra", lastName2: "Pereira", phoneNumber: "989474322"},
  {run: "9877467-2", name: 'Gilberto', lastName1: "Gonzalez", lastName2: "Arias", phoneNumber: "988745612"},
  {run: "8445721-2", name: 'Ariel', lastName1: "Muñoz", lastName2: "Leiva", phoneNumber: "911244878"},
];

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})

export class DriversListComponent implements OnInit {

  displayedColumns: string[] = ['run','name','lastName1','lastName2','phoneNumber','details','delete'];
  dataSource = new MatTableDataSource<Driver>(datos);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
/*
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(AddDriverComponent, dialogConfig);
  }*/
}
