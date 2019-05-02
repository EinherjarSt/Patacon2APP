import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator,MatDialog} from '@angular/material';
import{ PlanificationService} from '../../../../services/planification.service';
import{Planification} from '../../../../model-classes/planification';
import {DetailsComponent} from './details/details.component';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css']
})
export class PlanificationListComponent implements OnInit {
  planifications : Planification[];
  displayedColumns: string[] = ['id','producer','location','variety','date','details','dispatch'];
  dataSource: MatTableDataSource<Planification>;

  dialogResult ="";
  constructor( private planificationService: PlanificationService ,public dialog: MatDialog) {
    this.getP();
    }

  getP(){
    this.planificationService.getData().subscribe( data =>{
      this.planifications=data;
      this.dataSource = new MatTableDataSource<Planification>(this.planifications);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getP();
    
  }
public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDetails(id):void {
    var selected;
    this.planifications.forEach(element => {
      if(element.id==id){
          selected = element;
      }
    });
    this.dialog.open(DetailsComponent, {
      width: '400px',
      data: selected
    });
    
  }
  
 

}
