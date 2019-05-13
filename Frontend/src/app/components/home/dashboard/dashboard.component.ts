import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICON_REGISTRY_PROVIDER } from '@angular/material';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations:[
    trigger('direction', [
      transition('right <=> left', [
        style({
          transform: 'scale(1,5)',
          opacity:0
        }),
        animate('.2s 0s ease-out'),
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  lat: number = -35.0012238;
  lng: number = -71.2308186;
  shouldRun:boolean;

  
  @Input() public state:boolean = true;

  constructor() { }

  ngOnInit() {
    this.shouldRun = true;
  }

  protected get direction(): 'right' | 'left'{
    return this.state ? 'right':'left';
  }


}
