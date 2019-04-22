import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dialogResult = "";

  constructor( public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    let dialogRef = this.dialog.open(AddUserComponent, {
      width: '450px',
      data: 'This text is passed into the dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed: ${result}');
      this.dialogResult = result;
    })
  }

}
