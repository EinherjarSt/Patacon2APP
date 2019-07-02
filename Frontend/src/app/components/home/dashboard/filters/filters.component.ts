import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Filter } from 'src/app/model-classes/filter';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterService } from 'src/app/services/filter.service';
import { DispatchesService } from '../../../../services/dispatches.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DispatchDetailsComponent } from '../dispatch-details/dispatch-details.component';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { timer, Subscription } from "rxjs";
import { SMS } from 'src/app/services/sms.service';
import * as moment from 'moment';
import { InsightsService } from '../../../../services/insights.service';




@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  displayedColumns: string[] = ["select", "truck", "state", "destination", "actions"];
  dataSource = new MatTableDataSource<Filter>();
  selection = new SelectionModel<Filter>(true, []);
  selectedDispatches: Filter[] = this.selection.selected;
  isDataLoading: boolean;
  refreshTimer: Subscription;

  constructor(private _dispatchesService: DispatchesService, private dialog: MatDialog, private smsService: SMS,
    private insightsService: InsightsService) { }

  @ViewChild(MatSort) sort: MatSort;
  @Output() selectedChangeEvent = new EventEmitter<Filter[]>();

  ngOnInit() {
    this.getDispatches()
    this.selection.changed.subscribe(event => { this.selectedChangeEvent.emit(event.source.selected) });
    this.refreshTimer = timer(1000, 15000).subscribe(
      () => this.refreshTable()
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.refreshTimer.unsubscribe();

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  isDispatchTerminated(dispatch) {
    return dispatch.dispatchStatus.localeCompare('Terminado') == 0 || dispatch.dispatchStatus.localeCompare('Cancelado') == 0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Filter): string {

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.dispatchId + 1}`;
  }


  getDispatches(): void {

    this.isDataLoading = true;
    this._dispatchesService.getDispatchesWithFullInfo().subscribe({
      next: (dispatches) => {
        let data = this.filterNotTerminatedAndNotPendingDispatches(dispatches);
        this.dataSource.data = data;
        this.selectedChangeEvent.emit(data);
        this.masterToggle();
        this.isDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  filterNotTerminatedAndNotPendingDispatches(dispatches) {
    return dispatches.filter(dispatch => dispatch.dispatchStatus.localeCompare('Terminado') != 0 &&
      dispatch.dispatchStatus.localeCompare('Cancelado') != 0 && dispatch.dispatchStatus.localeCompare('Pendiente') != 0);
  }

  openDispatchDetailsDialog(dispatch: Filter) {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(DispatchDetailsComponent, dialogConfig);
  }


  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }



  sendSMS(idDispatch) {
    let message = "";
    //hacer consulta y agregar al mensaje los datos
    this.insightsService.getDispatchInsightsData(idDispatch).subscribe(data => {
      if (data != null) {
        if (data.textMessagesSent != null) {
          message = "Ha enviado " + data.textMessagesSent + " mensaje(s) al productor.\n" +
            "Último mensaje enviado: " + moment(data.lastMessageSentDate).format('DD/MM/YYYY hh:mm a') + "\n\n";
        }
      }
    }, e => { }, () => {
      message = message + "¿Desea enviar un nuevo sms?";
      this.openConfirmationDialog(message).afterClosed().subscribe(confirmation => {
        if (confirmation.confirmed) {
          this.smsService.sendSMS(idDispatch);

        }
      });
    });
  }


  refreshTable() {
    this.isDataLoading = true;
    let selectedDispatches = [...this.selection.selected];
    let newSelection: Filter[] = [];
    this._dispatchesService.getDispatchesWithFullInfo().subscribe({
      next: (dispatches) => {
        let filteredDispatches = this.filterNotTerminatedAndNotPendingDispatches(dispatches);

        selectedDispatches.forEach(selectedDispatch => {
          filteredDispatches.forEach(filteredDispatch => {
            if (selectedDispatch.dispatchId == filteredDispatch.dispatchId) {
              newSelection.push(filteredDispatch);
            }
          });

        });
        this.dataSource.data = filteredDispatches;
        this.selection = new SelectionModel<Filter>(true, newSelection);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  openConfirmationDialog(message) {

    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: message };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }


  cancelDispatch(dispatch_id) {
    
    this.openConfirmationDialog('¿Desea cancelar este despacho?').afterClosed().subscribe(
      confirmation => {
        if (confirmation.confirmed) {
          this._terminateDispatchAndCalculateInformation(dispatch_id, 'Cancelado');
        }

      });

  }

  terminateDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea cancelar este despacho?').afterClosed().subscribe(
      confirmation => {
        if (confirmation.confirmed) {
          this._terminateDispatchAndCalculateInformation(dispatch_id, 'Terminado');
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
                res => this.refreshTable()

              );
          }

        );

      }
    );
  }





}
