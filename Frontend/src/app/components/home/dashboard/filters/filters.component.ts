import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Filter } from 'src/app/model-classes/Filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  displayedColumns: string[] = ["show","truck","origin","destination","details"];
  dataSource: MatTableDataSource<Filter>;

  //Esto es para ver como se ve
  testList: Filter[] = [
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},
    {truck: 'BPTG-78', origin: 'Santa Catalina', destination: 'Patacon'},

  ];

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.testList);
  }

}
