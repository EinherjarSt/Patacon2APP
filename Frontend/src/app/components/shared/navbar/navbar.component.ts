import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResizeService } from '../../../services/resize.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMobile: boolean;

  constructor( private _resizeService: ResizeService) { }

  ngOnInit() {
    this._resizeService.width$.subscribe(width => {
      console.log(width)
      if (width < 768){
        this.isMobile  = true;
      }
      else{
        this.isMobile = false;
      }
    })
  }
}
