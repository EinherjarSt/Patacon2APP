import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-summary',
  templateUrl: './general-summary.component.html',
  styleUrls: ['./general-summary.component.css']
})
export class GeneralSummaryComponent implements OnInit {

  displayedColumns: string[] =  ['id', 'producer', '', 'symbol'];

  constructor() { }

  ngOnInit() {
  }

}
