import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatPaginator,MatDialog} from '@angular/material';
import{ PlanificationService} from '../../../../services/planification.service';
import{ ProducersService} from '../../../../services/producers.service';
import{Planification} from '../../../../model-classes/planification';
import {DetailsComponent} from './details/details.component';
import{ AddPlanificationComponent} from '../add-planification/add-planification.component';

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css']
})
export class PlanificationListComponent implements OnInit {
  planifications : Planification[];
  displayedColumns: string[] = ['date','producer','location','variety','kg','details','dispatch'];
  dataSource: MatTableDataSource<Planification>;

  dialogResult ="";
  constructor(private producerService: ProducersService, private planificationService: PlanificationService ,public dialog: MatDialog) {
    this.getP();
    }

  getP(){
    this.planificationService.getAllPlanifications().subscribe( data =>{
      this.planifications=data;
      //obtain name of producer
      this.planifications.forEach(element => {
        this.producerService.getProducer(element.ref_producer).subscribe(pr =>{
          element.ref_producer= pr.name;
        });
      });
      //obtain name of location
      this.planifications.forEach(element => {
        this.producerService.getLocationName(element.ref_location).subscribe(pr =>{
          element.ref_location= pr.address;
        });
      });

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

  openDetails(code):void {
    var selected;
    this.planifications.forEach(element => {
      if(element.planification_id==code){
          selected = element;
      }
    });
    this.dialog.open(DetailsComponent, {
      width: '400px',
      data: selected
    });
  }
  openDialog():void {

    this.dialog.open(AddPlanificationComponent, {
      width: '400px'
    });
  }
 

}
