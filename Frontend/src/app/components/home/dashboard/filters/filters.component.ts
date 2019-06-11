import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Filter } from 'src/app/model-classes/filter';
import { SelectionModel } from '@angular/cdk/collections';
import { FilterService } from 'src/app/services/filter.service';
import { DispatchesService } from '../../../../services/dispatches.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DispatchDetailsComponent } from '../dispatch-details/dispatch-details.component';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  displayedColumns: string[] = ["select","truck","state","destination","details"];
  dataSource = new MatTableDataSource<Filter>();
  selection = new SelectionModel<Filter>(true, []);
  selectedDispatches : Filter[] = this.selection.selected;
  isDataLoading: boolean;

  constructor(private _dispatchesService: DispatchesService, private dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  @Output() selectedChangeEvent = new EventEmitter<Filter[]>();

  ngOnInit() {
    this.getDispatches()
    this.selection.changed.subscribe(event => {this.selectedChangeEvent.emit(event.source.selected)});
    
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
      next: (data) => {
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

  


}
