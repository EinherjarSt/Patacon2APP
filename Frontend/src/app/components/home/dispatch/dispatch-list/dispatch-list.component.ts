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
import { ActivatedRoute } from '@angular/router';

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
  planificationId: number;
  public displayedColumns: string[] = ["status", "driver", "shippedKilograms", "arrivalAtVineyardDatetime", 
  "arrivalAtPataconDatetime","send", "edit", "delete"];
  public dataSource = new  MatTableDataSource<Dispatch>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataLoading: boolean;



  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog,
    private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.planificationId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getDispatches();
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getDispatches(): void {
    this.isDataLoading = true;
    this.dispatchesService.getDispatches(this.planificationId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteDispatch(dispatch_id) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) {
        this.dispatchesService.deleteDispatch(dispatch_id).subscribe({
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


  openRegisterDispatchDialog() {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      planificationId: this.planificationId
    };


    this.dialog.open(RegisterDispatchComponent, dialogConfig).afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) { 
        this.refreshTable();
      }
    });
  }
  
 
  
  openEditDispatchDialog(dispatch: Dispatch) {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(EditDispatchComponent, dialogConfig).afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) { 
        this.refreshTable();
      }
    });;
  }


  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  refreshTable() {
    this.getDispatches();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public sendMessage(){
    //NOT IMPLEMENTED
  }
}




