import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSortBase, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Dispatch } from '../../../../model-classes/dispatch'
import { DatePipe } from '@angular/common';
import { DispatchesService } from '../../../../services/dispatches.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RegisterDispatchComponent } from '../register-dispatch/register-dispatch.component';
import { EditDispatchComponent } from '../edit-dispatch/edit-dispatch.component'
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';


/**
 * @title Table with sorting
 */
@Component({
  selector: 'dispatch-list',
  styleUrls: ['dispatch-list.component.css'],
  templateUrl: 'dispatch-list.component.html',
})
export class DispatchListComponent implements OnInit {
  dateFormat = 'd/M/yy HH:mm';
  dispatches: Dispatch[];
  public displayedColumns: string[] = ["status", "driver", "shippedKilograms", "arrivalAtVineyardDatetime", 
  "arrivalAtPataconDatetime","container", "edit", "delete"];
  public dataSource = new  MatTableDataSource<Dispatch>();



  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataLoading: boolean;

  ngOnInit() {
    this.getDispatches();
    this.dataSource.sort = this.sort;
  }

  getDispatches(): void {
    this.isDataLoading = true;
    this.dispatchesService.getDispatches().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isDataLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isDataLoading = true
      }
    });
  }

  deleteDispatch(dispatch_id) {
    this.dispatchesService.deleteDispatch(dispatch_id).subscribe({
      next: result => {
        
      },
      error: result => { }
    });  
    this.showDeletionConfirmationDialog();
  }

  showDeletionConfirmationDialog() {
    
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar este despacho?'};
    var deletionDialogRef = this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);

    deletionDialogRef.afterClosed().subscribe(confirmation => {
      console.log(`Dialog result: ${confirmation.confirmed}`);
    });
    
  }

  refreshTable() {
    this.getDispatches();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }



  openRegisterDispatchDialog() {
    this.dialog.open(RegisterDispatchComponent, this.getDialogConfig());
  }

  
  openEditDispatchDialog(dispatch: Dispatch) {

    
    
    var arrivalAtPataconDateTime = moment(dispatch.arrivalAtPataconDate).format('YYYY-MM-DD HH:mm').split(' ');
    var arrivalAtVineyardDateTime = moment(dispatch.arrivalAtVineyardDate).format('YYYY-MM-DD HH:mm').split(' ');
    dispatch.arrivalAtPataconDate = new Date(arrivalAtPataconDateTime[0]);
    dispatch.arrivalAtPataconTime = arrivalAtPataconDateTime[1];

    dispatch.arrivalAtVineyardDate = new Date(arrivalAtVineyardDateTime[0]);
    dispatch.arrivalAtVineyardTime = arrivalAtVineyardDateTime[1];


    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(EditDispatchComponent, dialogConfig);
  }

}




