import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSortBase, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Dispatch } from '../../../../model-classes/dispatch'
import { DatePipe } from '@angular/common';
import { DispatchesService } from '../../../../services/dispatches.service';
import { InsightsService } from '../../../../services/insights.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { environment as env } from "@env/environment";
import { RegisterDispatchComponent } from '../register-dispatch/register-dispatch.component';
import { EditDispatchComponent } from '../edit-dispatch/edit-dispatch.component'
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/model-classes/filter';
import { ProducerviewService } from 'src/app/services/producerview.service';
import { SMS } from 'src/app/services/sms.service';
import { DispatchDetailsComponent } from '../../dashboard/dispatch-details/dispatch-details.component';
import { AuthService } from '../../../../services/auth.service';
import { NotifierService } from 'angular-notifier';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'dispatch-list',
  styleUrls: ['dispatch-list.component.css'],
  templateUrl: 'dispatch-list.component.html',
})
export class DispatchListComponent implements OnInit {
  dateFormat = 'd/M/yy HH:mm';
  dispatches: Dispatch[];
  planificationId: number;
  public displayedColumns: string[] = ["status", "driver", "shippedKilograms", "arrivalAtVineyardDatetime",
    "arrivalAtPataconDatetime", "delete", "edit","actions"];
  public dataSource = new MatTableDataSource<Dispatch>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataLoading: boolean;

  userType : String;

  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog,
    private route: ActivatedRoute,
    private dispatchService: DispatchesService,
    
    private smsService: SMS,
    private insightsService: InsightsService,
    private auth : AuthService, 
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.planificationId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getDispatches();
    this.dataSource.sort = this.sort;
    this.userType = this.auth.getUserType();

    if(this.userType == "Coordinador"){
      this.displayedColumns = ["status", "driver", "shippedKilograms", "arrivalAtVineyardDatetime",
      "arrivalAtPataconDatetime","start", "cancel", "terminate", "send"];
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getDispatches(): void {
    this.isDataLoading = true;
    this.dispatchesService.getDispatches(this.planificationId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isDataLoading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteDispatch(dispatch_id) {
    this.openConfirmationDialog('¿Desea eliminar este despacho?').afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.dispatchesService.deleteDispatch(dispatch_id).subscribe({
          next: result => { 
            this.refreshTable(); 
            this.notifierService.notify('info', 'El despacho ha sido eliminado');
          },
          error: result => { }
        });
      }

    });
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
    this.openConfirmationDialog('¿Desea señalar como completado este despacho?').afterClosed().subscribe(
      confirmation => {
        if (confirmation.confirmed) {
          this._terminateDispatchAndCalculateInformation(dispatch_id, 'Terminado');
        }

      });

  }

 
  _terminateDispatchAndCalculateInformation(dispatch_id, endStatus) {
    this.dispatchesService.terminateDispatch(dispatch_id, endStatus).subscribe(
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
        this.dispatchesService.startDispatch(dispatch_id).subscribe(
          res =>{
            this.smsService.sendSMS(dispatch_id);
            this.refreshTable();
            this.notifierService.notify('info', 'El despacho ahora está en tránsito hacia la viña');
          } );
      }

    });
  }

  openConfirmationDialog(message) {

    var deletionDialogConfig = this.getDialogConfig();
    deletionDialogConfig.data = { message: message };
    return this.dialog.open(ConfirmationDialogComponent, deletionDialogConfig);
  }


  openRegisterDispatchDialog() {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = {
      planificationId: this.planificationId
    };


    this.dialog.open(RegisterDispatchComponent, dialogConfig).afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.refreshTable();
      }
    });
  }


  openDispatchDetailsDialog(dispatch: Filter) {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(DispatchDetailsComponent, dialogConfig);
  }

  sendSMS(idDispatch) {
    let message = "";
    //hacer consulta y agregar al mensaje los datos
    this.insightsService.getDispatchInsightsData(idDispatch).subscribe(data =>{
      if(data!= null){
        if(data.textMessagesSent!=null){
        message = "Ha enviado "+data.textMessagesSent+ " mensaje(s) al productor.\n" +
        "Último mensaje enviado: "+ moment(data.lastMessageSentDate).format('DD/MM/YYYY hh:mm a')+"\n\n";
      }
      }
    },e=>{},()=>{
    message = message + "¿Desea enviar un nuevo sms?";
    this.openConfirmationDialog(message).afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.smsService.sendSMS(idDispatch);
        this.notifierService.notify('info', 'Se ha notificado al productor exitosamente');
      }
    });
  });
  }

  openEditDispatchDialog(dispatch: Dispatch) {

    var dialogConfig = this.getDialogConfig();
    dialogConfig.data = dispatch;

    this.dialog.open(EditDispatchComponent, dialogConfig).afterClosed().subscribe(confirmation => {
      if (confirmation.confirmed) {
        this.refreshTable();
      }
    });;
  }


  getDialogConfig() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    return dialogConfig;
  }

  isDispatchTerminated(dispatch) {
    return dispatch.status.localeCompare('Terminado') == 0 || dispatch.status.localeCompare('Cancelado') == 0;
  }

  refreshTable() {
    this.getDispatches();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}




