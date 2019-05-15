import { Component, OnInit, ViewChild } from '@angular/core';
import { Gps } from 'src/app/model-classes/gps';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig} from '@angular/material';
import { GpsService } from 'src/app/services/gps.service';
import { AddGpsComponent } from '../add-gps/add-gps.component';
import { EditGpsComponent } from '../edit-gps/edit-gps.component';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-gps-list',
  templateUrl: './gps-list.component.html',
  styleUrls: ['./gps-list.component.css']
})
export class GpsListComponent implements OnInit {

  gps: Gps[];
  displayedColumns: string[] = ["imei", "number", "brand", "model", "edit", "delete"];
  dialogResult ="";
  dataSource = new MatTableDataSource<Gps>();

  constructor(private gpsService: GpsService, private dialog: MatDialog) { }

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
      data: 'This text is passed into the dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed: ${result}');
      this.dialogResult = result;
    })
  }

  openUpdateDialog(imei: string){
    let dialogRef = this.dialog.open(EditGpsComponent, {
      width: '450px',
      data: {imei},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') this.refreshTable();
      this.dialogResult = result;
    })
  }

  deleteGPS(imei: string) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) {
        this.gpsService.deleteGPS(imei).subscribe({
          next: result => { this.refreshTable(); },
          error: result => {}
        }); 
      }
    });
  }

  openDeletionConfirmationDialog() {
    
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar este despacho?'};
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
