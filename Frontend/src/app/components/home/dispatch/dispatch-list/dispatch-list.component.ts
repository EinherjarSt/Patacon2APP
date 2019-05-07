import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSortBase, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Dispatch } from '../../../../model-classes/dispatch'
import { DispatchesService } from '../../../../services/dispatches.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RegisterDispatchComponent } from '../register-dispatch/register-dispatch.component';


/**
 * @title Table with sorting
 */
@Component({
  selector: 'dispatch-list',
  styleUrls: ['dispatch-list.component.css'],
  templateUrl: 'dispatch-list.component.html',
})
export class DispatchListComponent implements OnInit {

  dispatches: Dispatch[];
  public displayedColumns: string[] = ["status", "driver", "shippedKilograms", "estimatedDateArrivalAtProducer", 
  "estimatedTimeArrivalAtProducer", "estimatedDateArrivalAtPatacon", "estimatedTimeArrivalAtProducer","containers", "details", "delete"];
  public dataSource = new  MatTableDataSource<Dispatch>();



  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataLoading = true;

  ngOnInit() {
    this.getDispatches();
    this.dataSource.sort = this.sort;
  }

  getDispatches(): void {
    this.dispatchesService.getDispatches().subscribe(
        data => {
          this.isDataLoading = false;
          this.dataSource.data = data as Dispatch[];
        }, 
        error => this.isDataLoading = false
    );
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

  
  openEditDispatchDialog(dispatch : Dispatch) {
    //this.dialog.open(EditDispatchComponent, this.getDialogConfig());
  }

}




