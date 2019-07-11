import { Component, OnInit, ViewChild } from '@angular/core';
import { Gps } from 'src/app/model-classes/gps';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig} from '@angular/material';
import { GpsService } from 'src/app/services/gps.service';
import { AddGpsComponent } from '../add-gps/add-gps.component';
import { EditGpsComponent } from '../edit-gps/edit-gps.component';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.css']
})
export class GpsListComponent implements OnInit {
  private readonly notifier: NotifierService;
  gps: Gps[];
  displayedColumns: string[] = ["imei", "simNumber", "brand", "model", "edit", "delete"];
  dialogResult ="";
  dataSource = new MatTableDataSource<Gps>();

  constructor(private gpsService: GpsService, private dialog: MatDialog, notifierService: NotifierService) { 
    this.notifier = notifierService;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getGps();
  }

  getGps(): void {
    this.gpsService.getAllGPS().subscribe(
      data => {
        this.dataSource.data = data as Gps[];
      },
      error => console.log("Error")
    )
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddDialog(){
    let dialogRef = this.dialog.open(AddGpsComponent, {
      width: '450px',
      data: 'This text is passed into the dialog',
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Confirm'){
        this.refreshTable();
        this.notifier.notify('info', 'GPS agregado exitosamente');

      } 
      this.dialogResult = result;
    })
  }

  openUpdateDialog(imei: string){
    let dialogRef = this.dialog.open(EditGpsComponent, {
      width: '450px',
      data: {imei},
      disableClose: true,
      autoFocus: true

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm'){
        this.refreshTable();
        this.notifier.notify('info', 'GPS editado exitosamente');

      } 
      this.dialogResult = result;
    })
  }

  deleteGPS(imei: string) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) {
        this.gpsService.deleteGPS(imei).subscribe({
          next: result => {
             this.refreshTable(); 
             this.notifier.notify('info', 'GPS eliminado exitosamente');

            },
          error: result => {}
        }); 
      }
    });
  }

  openDeletionConfirmationDialog() {
    
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar este gps?'};
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


   
    return dialogConfig;
  }

  refreshTable() {
    this.getGps();
  }

}
