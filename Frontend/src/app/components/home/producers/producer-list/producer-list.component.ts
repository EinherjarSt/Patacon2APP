import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddProducerComponent } from '../add-producer/add-producer.component';
import { Producer } from 'src/app/model-classes/producer';
import { ProducersService } from 'src/app/services/producers.service';
import { UpdateProducerComponent } from '../update-producer/update-producer.component';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.css']
})
export class ProducerListComponent implements OnInit {

  producers: Producer[];
  displayedColumns: string[] = ["name", "rut", "locations", "details", "delete"];
  dataSource: MatTableDataSource<Producer>;

  constructor(private producerService: ProducersService, private dialog: MatDialog) { }

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
      width: '500px',
      height: '95%'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result === "Confirm") this.refreshTable();
      console.log('The dialog was closed');
    });
  }

  openUpdateDialog(rut: string){
    const dialogRef = this.dialog.open(UpdateProducerComponent, {
      data: rut,
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteProducer(rut: string){

  }

  refreshTable() {
    this.getProducers();
  }
}
