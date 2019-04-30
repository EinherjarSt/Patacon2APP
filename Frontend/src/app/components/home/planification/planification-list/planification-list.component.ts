import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator,MatDialog} from '@angular/material';

export interface Planification {
  id: string;
  producer: string;
  location: string;
  variety: string;
  date: string;
}

const datos: Planification[] = [
  {id: "12883", producer: 'Viña san Pedro', location: "Molina", variety: "Merlot", date: "22/05/2019"},
  {id: "12312", producer: 'Viña Dominguez', location: "Molina", variety: "Blanco", date: "01/05/2020"},
  {id: "34534", producer: 'Viña Atalaya', location: "Lontue", variety: "None", date: "11/06/2019"},
  {id: "62435", producer: 'Viña Pepito', location: "Tutuquen", variety: "Blanco", date: "22/05/2019"},
];

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css']
})
export class PlanificationListComponent implements OnInit {
  dialogResult ="";
  constructor( public dialog: MatDialog) { }

  displayedColumns: string[] = ['id','producer','location','variety','date','details','dispatch'];
  dataSource = new MatTableDataSource<Planification>(datos);

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
  openDialog():void {
    this.dialog.open(, {
      width: '400px'
    });
    
  }*/

}
