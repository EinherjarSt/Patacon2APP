import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSortBase, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Dispatch } from '../../../../model-classes/dispatch'
import { DatePipe } from '@angular/common';
import { DispatchesService } from '../../../../services/dispatches.service';
import { InsightsService } from '../../../../services/insights.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RegisterDispatchComponent } from '../register-dispatch/register-dispatch.component';
import { EditDispatchComponent } from '../edit-dispatch/edit-dispatch.component'
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/components/core/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { Filter } from 'src/app/model-classes/filter';
import { ProducerviewService } from 'src/app/services/producerview.service';
import { SMS } from 'src/app/services/sms.service';

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
    "arrivalAtPataconDatetime", "send", "edit", "delete"];
  public dataSource = new MatTableDataSource<Dispatch>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataLoading: boolean;



  constructor(private dispatchesService: DispatchesService, private dialog: MatDialog,
    private route: ActivatedRoute,
    private dispatchService: DispatchesService,
    private producerViewService: ProducerviewService,
    private smsService: SMS,
    private insightsService: InsightsService) { }

  ngOnInit() {
    this.planificationId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getDispatches();
    this.dataSource.sort = this.sort;
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
          next: result => { this.refreshTable(); },
          error: result => { }
        });
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
        let info: Filter;
        this.dispatchService.getDispatchWithFullInfo(idDispatch).subscribe(res => {
          info = res;
          console.log(res);
          let condition = this.verifyConditionsSMS(info);
          if (condition != 0) {

            if (condition == 1) {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n EL CAMION NO TIENE GPS!!");
            }
            else if (condition == 2) {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n TIENE ESTADO PENDIENTE!!");
            }
            else {
              //INSERT AN ALERT HEREEEE!!!!
              console.log("NO SE PUEDE NOTIFICAR AL PRODUCTOR!!\n TIENE ESTADO TERMINADO!!");
            }

          }
          else {
            let message = "\nDespacho Iniciado! \n" +
              "Chofer: " + info.driverName + " " + info.driverSurname + "/" + info.driverRun +
              "\nTel: " + info.driverPhoneNumber;

            //THE ARRIVAL TIME ISN'T IN THE MESSAGE BECAUSE THIS DOESN'T FIT INTO FREE SMS's
            //FOR THE FULL VERSION ADD THE NEXT LINES 
            /**
                let date = info.arrivalAtVineyardDatetime.toString().replace(/T/, ' ').replace(/\..+/, '').substr(11,16);
                message+="\nLlegada: "+date +"\n";
            */

            let idCypher = this.producerViewService.encryptNumber(info.dispatchId + "");
            //REPLACE THE LOCALHOST:4200 BY THE FINAL ADDRESS
            let url = "\nhttp://localhost:4200/#/producer/" + idCypher;
            message += url;
            this.smsService.sendMessage(info.producerPhoneNumber, message).subscribe(res => {
              console.log(res);
                this.insightsService.editLastMessageSentData(info.dispatchId);
            });
          }

        });
      }

    });
  });
  }

  /**
   * Verify if an sms have correct data
   * 0: is OK
   * 1: The truck doesn't have GPS
   * 2: The status is 'Pendiente'
   * 3: The status is 'Terminado'
   * @param filter 
   */
  verifyConditionsSMS(filter: Filter) {
    if (filter.truckGPSImei == null) return 1;
    else if (filter.dispatchStatus == 'Pendiente') return 2;
    else if (filter.dispatchStatus == 'Terminado') return 3;
    return 0;
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



  refreshTable() {
    this.getDispatches();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public terminateDispatch(dispatchId, endStatus) {
    this.dispatchService.terminateDispatch(dispatchId, endStatus);
  }

}




