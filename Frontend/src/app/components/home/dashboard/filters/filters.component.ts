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


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  displayedColumns: string[] = ["select", "truck", "state", "destination", "options"];
  dataSource = new MatTableDataSource<Filter>();
  selection = new SelectionModel<Filter>(true, []);
  selectedDispatches: Filter[] = this.selection.selected;
  isDataLoading: boolean;
  refreshTimer: Subscription;

  constructor(private _dispatchesService: DispatchesService, private dialog: MatDialog) { }

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


  terminateDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea terminar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this._dispatchesService.terminateDispatch(dispatch_id, "Terminado");
        this.refreshTable();
      }

    });
  }


  refreshTable() {
    this.isDataLoading = true;
    this._dispatchesService.getDispatchesWithFullInfo().subscribe({
      next: (dispatches) => {
        let listedDispatches = this.selection.selected;
        let filteredDispatches = this.filterNotTerminatedAndNotPendingDispatches(dispatches);

        filteredDispatches.forEach(filteredDispatch => {
          listedDispatches.forEach(listedDispatch => {
            if (listedDispatch.dispatchId == filteredDispatch.dispatchId) {
              listedDispatch.dispatchId  = filteredDispatch.dispatchId;
              listedDispatch.dispatchStatus  = filteredDispatch.dispatchStatus;
              listedDispatch.driverRef = filteredDispatch.driverRef;
              listedDispatch.truckLicensePlate = filteredDispatch.truckLicensePlate;
              listedDispatch.arrivalAtPataconDatetime = filteredDispatch.arrivalAtPataconDatetime;
              listedDispatch.arrivalAtVineyardDatetime = filteredDispatch.arrivalAtVineyardDatetime;
              listedDispatch.shippedKilograms = filteredDispatch.shippedKilograms;
              listedDispatch.containerType = filteredDispatch.containerType;
              listedDispatch.driverRun = filteredDispatch.driverRun;
              listedDispatch.driverName = filteredDispatch.driverName;
              listedDispatch.driverSurname = filteredDispatch.driverSurname;
              listedDispatch.driverPhoneNumber = filteredDispatch.driverPhoneNumber;
              listedDispatch.producerName = filteredDispatch.producerName;
              listedDispatch.producerLocation = filteredDispatch.producerLocation;
              listedDispatch.producerPhoneNumber = filteredDispatch.producerPhoneNumber;
              listedDispatch.truckGPSImei = filteredDispatch.truckGPSImei;
              listedDispatch.truckBrand = filteredDispatch.truckBrand;
              listedDispatch.truckModel = filteredDispatch.truckModel;
              listedDispatch.truckYear = filteredDispatch.truckYear;
            }
          });
        });

        //this.dataSource.data = data;
        //this.selectedChangeEvent.emit(data);
        //this.masterToggle();
        this.isDataLoading = false;
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
    this.openConfirmationDialog('¿Desea cancelar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this._dispatchesService.terminateDispatch(dispatch_id, "Cancelado");
        this.refreshTable();
      }

    });

  }




}
