import { Component, OnInit } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';
import { MatDatepicker, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { InsightsDataTable } from 'src/app/model-classes/insights_data_table';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
@Component({
  selector: 'app-general-summary',
  templateUrl: './general-summary.component.html',
  styleUrls: ['./general-summary.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }

  ]
})
export class GeneralSummaryComponent implements OnInit {

  startDate: FormControl;
  endDate: FormControl;

  successfulDispatches: number;
  canceledDispatches: number;
  messagesSent: number;

  displayedColumns: string[] = ["dispatchDate", "producerName", "truckLicensePlate", "driverRun","stoppedTime", "unloadYardTime", "textMessagesSent","lastMessageSentDate","visitsCounter"]; 
  dataSource: MatTableDataSource<InsightsDataTable>;


  csvOptions = {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Resumen general:',
    useBom: true,
    noDownload: false,
    headers: ["Fecha", "Productor", "Camión", "Chofer","Tiempo detenido", "Tiempo en patio", "SMS enviados","Último mensaje enviado", "Contador de visitas"]
  };
  constructor(private insightsService: InsightsService, private notifierService: NotifierService) { }

  
  ngOnInit() {
    this.startDate = new FormControl();
    this.endDate = new FormControl();
    this.dataSource = new MatTableDataSource();

  }


  getInsights() {
    if (this.startDate.value != undefined && this.endDate.value != undefined) {
      var dateRangeStart = this.startDate.value.format('YYYY-MM-DD HH:mm:ss');
      var dateRangeEnd = this.endDate.value.format('YYYY-MM-DD HH:mm:ss');

      this.getCanceledDispatches(dateRangeStart, dateRangeEnd);
      this.getMessagesSentCount(dateRangeStart, dateRangeEnd);
      this.getSuccessfulDispatchesCount(dateRangeStart, dateRangeEnd);
      this.getStatisticsTableInformation(dateRangeStart, dateRangeEnd);
    }
    else {
      this.notifierService.notify('warning', 'Debe ingresar ambas fechas');
    }
  }

  getCanceledDispatches(startDate, endDate) {

    this.insightsService.getCanceledDispatchCount(startDate, endDate).subscribe(
      data => {
        this.canceledDispatches = data.dispatchCount;
      });
  }

  getSuccessfulDispatchesCount(startDate, endDate) {
    this.insightsService.getSuccessfulDispatchCount(startDate, endDate).subscribe(
      data => {
        this.successfulDispatches = data.dispatchCount;
      }
    );
  }

  getMessagesSentCount(startDate, endDate) {
    this.insightsService.getNumberOfMessagesSent(startDate, endDate).subscribe(
      data => {
        this.messagesSent = data.messageCount;
      }
    );
  }

  getStatisticsTableInformation(startDate, endDate){
    this.insightsService.getDispatchesInsightsByDataRange(startDate, endDate).subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
        
      console.log(result)},
      error: (err) => {console.log(err);}
    });
  }

  downloadCSV(){
    new AngularCsv(this.dataSource.data, "Resumen general", this.csvOptions)
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }






}
