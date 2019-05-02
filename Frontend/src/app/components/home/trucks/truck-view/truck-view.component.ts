import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { AddTruckComponent } from '../add-truck/add-truck.component';

export interface truck{
  model: string,
  brand: string,
  year: number,
  patent: string
}

const truckList: truck[] = [
  {model: 'modelo 1', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 2', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 3', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 4', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 5', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 6', brand: 'toyota', year: 1994, patent: 'ABDC12'},
  {model: 'modelo 7', brand: 'toyota', year: 1994, patent: 'ABDC12'}
];

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class TruckViewComponent implements OnInit {

  displayedColumns: string[] = ["model","brand","year","patent", "details", "delete"];
  dataSource = new MatTableDataSource(truckList);

  constructor(public dialog: MatDialog) { 

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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}

