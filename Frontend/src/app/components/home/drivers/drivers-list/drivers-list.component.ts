import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ConfirmationDialogComponent } from "src/app/components/core/confirmation-dialog/confirmation-dialog.component";
import { AddDriverComponent } from "../add-driver/add-driver.component";
import { Driver } from "../../../../model-classes/driver";
import { DriversService } from "../../../../services/drivers.service";
import { EditDriverComponent } from "../edit-driver/edit-driver.component";

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
    let dialogRef = this.dialog.open(AddDriverComponent, {
      width: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed");
      this.ngOnInit();
    });
  }

  openUpdateDialog(run: string) {
    const dialogRef = this.dialog.open(EditDriverComponent, {
      data: run,
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') this.refreshTable();
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
