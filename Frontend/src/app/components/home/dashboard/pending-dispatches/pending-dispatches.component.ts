import { Component, OnInit, ViewChild} from '@angular/core';
import { DispatchesService } from '../../../../services/dispatches.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Filter } from 'src/app/model-classes/filter';
import { DispatchDetailsComponent } from '../dispatch-details/dispatch-details.component';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { SMS } from 'src/app/services/sms.service';
import { InsightsService } from '../../../../services/insights.service';
import { timer, Subscription } from "rxjs";
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-pending-dispatches',
  templateUrl: './pending-dispatches.component.html',
  styleUrls: ['./pending-dispatches.component.css']
})
export class PendingDispatchesComponent implements OnInit {

  dateFormat = 'd/M/yy HH:mm';
  displayedColumns: string[] = ["truckLicensePlate","destination", "arrivalAtVineyardDatetime", "actions"];
  isDataLoading: boolean;
  dataSource = new MatTableDataSource<Filter>();
  refreshTimer: Subscription;

  constructor(private _dispatchesService: DispatchesService, private dialog: MatDialog,
    private smsService: SMS, private insightsService: InsightsService, 
    private notifierService: NotifierService) { }

  @ViewChild(MatSort) sort: MatSort;

  sortingCustomAccesor = (item, property) => {
    switch(property) {
      case 'destination': return item.producerName + ' ' + item.producerLocation;
      default: return item[property];
    }
  };

  ngOnInit() {
    this.getDispatches();
    this.dataSource.sortingDataAccessor = this.sortingCustomAccesor;
    this.refreshTimer = timer(1000, 15000).subscribe(
      () => this.refreshTable()
    );

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
    
    this.openConfirmationDialog('¿Desea cancelar este despacho?').afterClosed().subscribe(
      confirmation => {
        if (confirmation.confirmed) {
          this._terminateDispatchAndCalculateInformation(dispatch_id, 'Cancelado');
        }

      });

  }

  

  _terminateDispatchAndCalculateInformation(dispatch_id, endStatus) {
    this._dispatchesService.terminateDispatch(dispatch_id, endStatus).subscribe(
      res => {
        this.insightsService.calculateTotalTimePerStatus(dispatch_id).subscribe(
          timePerStatus => {

            this.insightsService.setStatusTimesPerDispatch(dispatch_id,
              timePerStatus.stopped, timePerStatus.inUnloadYard).subscribe(
                res => { 
                  this.refreshTable();
                  if(endStatus == "Terminado") {
                    this.notifierService.notify('info', 'El despacho ha sido completado exitosamente');
                  }
                  else if (endStatus == "Cancelado") {
                    this.notifierService.notify('info', 'El despacho ha sido cancelado');
                  }
                
                }

              );
          }

        );

      }
    );
  }

  startDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea empezar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this._dispatchesService.startDispatch(dispatch_id).subscribe(
          res =>{
            this.smsService.sendSMS(dispatch_id);
            this.refreshTable();
            this.notifierService.notify('info', 'El despacho ahora está en tránsito hacia la viña');
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
