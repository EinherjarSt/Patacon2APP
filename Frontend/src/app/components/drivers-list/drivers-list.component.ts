import { Component, OnInit , ViewChild} from '@angular/core';
import { NgModule } from '@angular/core';
import { ToolbarComponent} from '../toolbar/toolbar.component'

import {MatSort, MatTableDataSource} from '@angular/material';

export interface Driver {
  run: string;
  name: string;
  lastName1: string;
  lastName2: string;
  phoneNumber: string;
}


const ELEMENT_DATA: Driver[] = [
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

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
  ],
  providers: [],
  bootstrap: []
})


export class DriversListComponent implements OnInit {

  displayedColumns: string[] = ['run','name','lastName1','lastName2','phoneNumber'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
