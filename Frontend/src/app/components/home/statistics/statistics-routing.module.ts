import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralSummaryComponent } from './general-summary/general-summary.component';
import { SummaryByDriverComponent } from './summary-by-driver/summary-by-driver.component';

const routes: Routes = [

  {path: 'general',component: GeneralSummaryComponent},
  {path: 'choferes',component: SummaryByDriverComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
