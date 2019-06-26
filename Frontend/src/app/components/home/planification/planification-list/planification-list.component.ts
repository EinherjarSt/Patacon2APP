import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { PlanificationService } from '../../../../services/planification.service';
import { ProducersService } from '../../../../services/producers.service';
import { Planification } from '../../../../model-classes/planification';
import { DetailsComponent } from './details/details.component';
import { AddPlanificationComponent } from '../add-planification/add-planification.component';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

import { DispatchesService } from 'src/app/services/dispatches.service';
import { Dispatch } from 'src/app/model-classes/dispatch';
import { dispatch } from 'rxjs/internal/observable/range';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-planification-list',
  templateUrl: './planification-list.component.html',
  styleUrls: ['./planification-list.component.css']
})
export class PlanificationListComponent implements OnInit {
  planifications: Planification[];
  displayedColumns: string[] = ['date', 'producer', 'location', 'variety', 'kg', 'details', 'dispatch', 'edit', 'delete'];
  dataSource: MatTableDataSource<Planification>;
  private readonly notifier: NotifierService;
  userType: String;

  dialogResult = "";
  constructor(private producerService: ProducersService,
    private planificationService: PlanificationService,
    private auth: AuthService,
    public dialog: MatDialog,
    public router: Router,
    private dispatchService: DispatchesService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
      this.getProducers();
  }

  getProducers() {
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
    this.getProducers();
    this.userType = this.auth.getUserType();

    if(this.userType == "Encargado de Flota"){
      this.displayedColumns = ['date', 'producer', 'location', 'variety', 'kg', 'details', 'dispatch'];
    }
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
      if (result == 'Confirm') this.getProducers();
      this.dialogResult = result;
    })
  }

  deletePlanification(id) {
    this.dispatchService.getDispatches(id).subscribe(res=>{
      let result:boolean = true;
      let dispatchList: Dispatch[] = res;
      for (let i = 0; i < dispatchList.length; i++) {
        const dispatch = dispatchList[i];
        if(dispatch.status!='Terminado' ) result = false;
        if(dispatch.status!='Cancelado') result= false;
      }
      if(!result){
        this.notifier.notify('error', 'No se puede Eliminar: Existen despachos que no han terminado');
      }
      else{
        this.openDeletionConfirmationDialog().afterClosed().subscribe(confirmation => {
          if (confirmation.confirmed) {
            for (let i = 0; i < dispatchList.length; i++) {
              const dispatchId = dispatchList[i].id;
              this.dispatchService.deleteDispatch(dispatchId).subscribe(res=>{

              }, err=>{

              });
            }
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
              this.notifier.notify('info', 'Planificación Eliminada con éxito');
            }), err=>{
              this.notifier.notify('error', 'No se ha podido eliminar la planificación');
            };
          }
        });
      }
    },err=>{}, ()=>{

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
      if (result == 'Confirm') this.getProducers();
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
