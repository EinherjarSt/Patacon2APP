import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddProducerComponent } from '../add-producer/add-producer.component';
import { Producer } from 'src/app/model-classes/producer';
import { ProducersService } from 'src/app/services/producers.service';
import { UpdateProducerComponent } from '../update-producer/update-producer.component';
import { UpdateLocationComponent } from '../update-location/update-location.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class ProducerListComponent implements OnInit {
  private readonly notifier: NotifierService;
  producers: Producer[];
  displayedColumns: string[] = ["name", "rut", "details", "delete"];
  dataSource: MatTableDataSource<Producer>;
  expandedElement: Producer | null;

  constructor(private producerService: ProducersService, private dialog: MatDialog, notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    this.getProducers();
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
  }

  getProducers(): void{
    this.producerService.getProducers().subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProducerComponent, {
      width: '600px',
      height: '95%',
      disableClose: true,
      autoFocus: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result === "Confirm"){
        this.refreshTable();
        this.notifier.notify('info', 'Productor agregado exitosamente');

      } 
    });
  }

  openUpdateDialog(rut: string){
    const dialogRef = this.dialog.open(UpdateProducerComponent, {
      data: rut,
      width: '500px',
      disableClose: true,
      autoFocus: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == "Confirm"){
        this.refreshTable();
        this.notifier.notify('info', 'Productor modificado exitosamente');
      } 
    });
  }

  openLocationUpdateDialog(id_location: string){
    const dialogRef = this.dialog.open(UpdateLocationComponent, {
      data: id_location,
      width: '500px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "Confirm"){
        this.refreshTable();
        this.notifier.notify('info', 'Ubicación modificada exitosamente');
      } 
    });
  }

  deleteLocation(id_location: string){
    console.log(id_location);
    this.producerService.deleteLocation(id_location).subscribe({
      next: result =>{
        if(result == true){
          this.refreshTable();
          this.notifier.notify('info', 'Ubicación eliminada exitosamente');
        }
      },
      error: result => {
        console.log("error");
      }
    });
  }

  deleteProducer(rut: string){
    this.producerService.deleteProducer(rut).subscribe({
      next: (result) => {
        if(result == true){
          this.refreshTable();
          this.notifier.notify('info', 'Productor eliminado exitosamente');
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  refreshTable() {
    this.getProducers();
  }
}
