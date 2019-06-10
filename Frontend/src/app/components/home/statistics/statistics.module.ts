import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { GeneralSummaryComponent } from './general-summary/general-summary.component';
import { SummaryByDriverComponent } from './summary-by-driver/summary-by-driver.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    GeneralSummaryComponent,
    SummaryByDriverComponent
  ]
})
export class StatisticsModule { }
