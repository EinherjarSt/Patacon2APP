import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-summary-by-driver',
  templateUrl: './summary-by-driver.component.html',
  styleUrls: ['./summary-by-driver.component.css']
})
export class SummaryByDriverComponent implements OnInit {

  public doughnutChartLabels: Label[] = ['Viajando', 'Detenido'];
  public doughnutChartData: MultiDataSet = [
    [350, 450]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
