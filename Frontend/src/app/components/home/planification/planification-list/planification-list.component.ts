import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { PlanificationService } from '../../../../services/planification.service';
import { ProducersService } from '../../../../services/producers.service';
import { Planification } from '../../../../model-classes/planification';
import { DetailsComponent } from './details/details.component';
import { AddPlanificationComponent } from '../add-planification/add-planification.component';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css']
})
export class PlanificationListComponent implements OnInit {
  planifications: Planification[];
  displayedColumns: string[] = ['date', 'producer', 'location', 'variety', 'kg', 'details', 'dispatch', 'edit', 'delete'];
  dataSource: MatTableDataSource<Planification>;

  dialogResult = "";
  constructor(private producerService: ProducersService,
    private planificationService: PlanificationService,
    public dialog: MatDialog,
    public router: Router) {
    this.getP();
  }

  getP() {
    this.planificationService.getAllPlanifications().subscribe(data => {
      this.planifications = data;
      //obtain name of producer
      this.planifications.forEach(element => {
        this.producerService.getProducer(element.ref_producer.rut).subscribe(pr => {
          element.ref_producer = pr;
        });
      });
      //obtain name of location
      this.planifications.forEach(element => {
        this.producerService.getLocation(element.ref_location.id_location).subscribe(location => {
          element.ref_location = location;
        });
      });
      this.dataSource = new MatTableDataSource<Planification>(this.planifications);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getP();

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDetails(code): void {
    var selected;
    this.planifications.forEach(element => {
      if (element.planification_id == code) {
        selected = element;
      }
    });
    this.dialog.open(DetailsComponent, {
      width: '400px',
      data: selected
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(AddPlanificationComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') this.getP();
      this.dialogResult = result;
    })
  }

  deletePlanification(id) {
    this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.planificationService.deletePlanification(id).subscribe(r => {
          if (r) {
            for (let i = 0; i < this.planifications.length; i++) {
              const element = this.planifications[i];
              if (element.planification_id == id) {
                this.planifications.splice(i, 1);
                i--;
              }
            }
            this.dataSource.data = this.planifications;
          }
        });
      }
    });


  }

  editPlanification(id) {
    var selected;
    this.planifications.forEach(element => {
      if (element.planification_id == id) {
        selected = element;
      }
    });
    let dialogRef = this.dialog.open(AddPlanificationComponent, {
      width: '400px',
      data: selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Confirm') this.getP();
      this.dialogResult = result;
    })
  }

  openDeletionConfirmationDialog() {

    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: '¿Desea eliminar esta planificación?' };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }

  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  redirectToDispatchList(dispatchId) {
    this.router.navigate(['/inicio/despachos', dispatchId]);
  }
}
