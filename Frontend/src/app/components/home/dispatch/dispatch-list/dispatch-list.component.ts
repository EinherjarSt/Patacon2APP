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
  displayedColumns: string[] = ["status", "driver", "shippedKilograms", "estimatedDateArrivalAtProducer", 
  "estimatedTimeArrivalAtProducer", "estimatedDateArrivalAtPatacon", "estimatedTimeArrivalAtProducer","containers", "details", "delete"];
  dataSource: MatTableDataSource<Dispatch>;



  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getDispatches();
    this.dataSource = new MatTableDataSource(this.dispatches);
    this.dataSource.sort = this.sort;
  }

  getDispatches(): void {
    //this.dispatches = this.dispatchesService.getDispatches();
    this.dispatches = [];
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(RegisterDispatchComponent, dialogConfig);
  }
}




