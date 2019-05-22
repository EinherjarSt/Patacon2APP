import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { AddTruckComponent } from '../add-truck/add-truck.component';
import { ConfirmationDialogComponent } from "src/app/components/core/confirmation-dialog/confirmation-dialog.component";
import { TrucksService } from '../../../../services/trucks.service';
import { Truck } from '../../../../model-classes/truck';
import { EditTruckComponent } from "../edit-truck/edit-truck.component";

@Component({
  selector: 'app-truck-view',
  templateUrl: './truck-view.component.html',
  styleUrls: ['./truck-view.component.css']
})
export class TruckViewComponent implements OnInit {
  dialogResult="";
  trucks: Truck[];
  displayedColumns: string[] = [
    "licencePlate",
    "brand",
    "model",
    "year",
    "details", 
    "delete"
  ];
  dataSource: MatTableDataSource<Truck>;

  constructor( private trucksService : TrucksService,
    public dialog: MatDialog){
      this.dataSource = new MatTableDataSource<Truck>();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this.getTruck();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTruck(): void {
    this.trucksService.getAllTrucks().subscribe(
      data => {
        this.dataSource.data = data as Truck[];
        console.log(data);
      },
      error => console.log("Error")
    );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTruckComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  openUpdateDialog(truck: Truck) {
    console.log("Entro a openUpdateDialog en truck-view.component.ts");

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = truck;

    this.dialog.open(EditTruckComponent, dialogConfig).afterClosed().subscribe(confirmation => {
      if(confirmation.confirmed) { 
        this.refreshTable();
      }
    });;
  }

  /* openUpdateDialog(data: Truck) {
    const dialogRef = this.dialog.open(EditTruckComponent, {
      data: Truck,
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') this.refreshTable();
    });
  }
 */
  openDeleteDialog(truckData: Truck){
    console.log(truckData);
    console.log(truckData.licencePlate, truckData.disabled);
    truckData.disabled = truckData.disabled ? false: true;
    this.trucksService.disableTruck(truckData).subscribe({
      next: result => {
        console.log(result);
      },
      error: result => {
        console.log("error en componente para listar");
      }
    });
    console.log(truckData.licencePlate, truckData.disabled);
    this.refreshTable();
  }

  openDeletionConfirmationDialog() {
    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: "¿Desea eliminar este camion?" };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "500px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  refreshTable() {
    this.getTruck();
  }

  
  /* deleteTruck(licencePlate: string) {
    //Esto no borra el camion, solo lo oculta
    this.openDeletionConfirmationDialog()
      .afterClosed()
      .subscribe(confirmation => {
        if (confirmation.confirmed) {
          this.trucksService.disableTruck(licencePlate).subscribe({
            next: result => {
              this.refreshTable();
            },
            error: result => {}
          });
        }
      });
  } */

}

