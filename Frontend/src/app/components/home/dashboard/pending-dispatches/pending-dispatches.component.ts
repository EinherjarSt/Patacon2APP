import { Component, OnInit } from '@angular/core';
import { DispatchesService } from '../../../../services/dispatches.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Filter } from 'src/app/model-classes/filter';
import { DispatchDetailsComponent } from '../dispatch-details/dispatch-details.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { SMS } from 'src/app/services/sms.service';


@Component({
  selector: 'app-pending-dispatches',
  templateUrl: './pending-dispatches.component.html',
  styleUrls: ['./pending-dispatches.component.css']
})
export class PendingDispatchesComponent implements OnInit {

  dateFormat = 'd/M/yy HH:mm';
  displayedColumns: string[] = ["truck","destination", "arrivalAtVineyardDatetime", "actions"];
  isDataLoading: boolean;
  dataSource = new MatTableDataSource<Filter>();

  constructor(private _dispatchesService: DispatchesService, private dialog: MatDialog,
    private smsService: SMS) { }

  ngOnInit() {
    this.getDispatches()

  }

  
  getDispatches(): void {

    this.isDataLoading = true;
    this._dispatchesService.getDispatchesWithFullInfo().subscribe({
      next: (dispatches) => {
        this.dataSource.data = this.filterPendingDispatches(dispatches);
        this.isDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  filterPendingDispatches(dispatches) {
    return dispatches.filter(dispatch => dispatch.dispatchStatus.localeCompare('Pendiente') == 0);
  }

  refreshTable() {
    this.getDispatches();
  }

  openConfirmationDialog(message) {

    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: message };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }


  cancelDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea cancelar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this._dispatchesService.terminateDispatch(dispatch_id, "Cancelado");
        this.refreshTable();
      }

    });
  }

  startDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea empezar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this._dispatchesService.startDispatch(dispatch_id).subscribe(
          res =>{
            this.smsService.sendSMS(dispatch_id);
            this.refreshTable();

          } );
      }

    });
  }

  openDispatchDetailsDialog(dispatch: Filter) {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(DispatchDetailsComponent, dialogConfig);
  }

}
