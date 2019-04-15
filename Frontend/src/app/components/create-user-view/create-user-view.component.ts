import { Component, OnInit, NgModule } from '@angular/core';

import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-create-user-view',
  templateUrl: './create-user-view.component.html',
  styleUrls: ['./create-user-view.component.css']
})

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [],
  providers: [],
  bootstrap: []
})

export class CreateUserViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
