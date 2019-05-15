import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AddDriverComponent } from "../add-driver/add-driver.component";
import { Driver } from "../../../../model-classes/driver";
import { DriversService } from "../../../../services/drivers.service";
import { ConfirmationDialogComponent } from "src/app/components/core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-drivers-list",
  templateUrl: "./drivers-list.component.html",
  styleUrls: ["./drivers-list.component.css"]
})
export class DriversListComponent implements OnInit {
  dialogResult = "";
  drivers: Driver[];
  displayedColumns: string[] = [
    "run",
    "name",
    "surname",
    "surname2",
    "phoneNumber",
    "details",
    "delete"
  ];
  dataSource: MatTableDataSource<Driver>;

  constructor(
    private driversService: DriversService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Driver>();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getDriver();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDriver(): void {
    this.driversService.getAllDrivers().subscribe(
      data => {
        this.dataSource.data = data as Driver[];
      },
      error => console.log("Error")
    );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  ngAfterViewInit(): void {}

  openAddDialog(): void {
    this.dialog.open(AddDriverComponent, {
      width: "400px"
    });
  }

  deleteDriver(run: string) {
    this.openDeletionConfirmationDialog()
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation.confirmed) {
          this.driversService.deleteDriver(run).subscribe({
            next: result => {
              this.refreshTable();
            },
            error: result => {}
          });
        }
      });
  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: "¿Desea eliminar este despacho?" };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  refreshTable() {
    this.getDriver();
  }

}
