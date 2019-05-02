import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  

  constructor( ) { }

  ngOnInit() {
  }



}
