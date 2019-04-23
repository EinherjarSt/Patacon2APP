import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model-classes/user';
import { MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ["run", "name", "surname", "surname2", "email","details", "update", "delete"];
  dataSource: MatTableDataSource<User>;

  constructor(private usersService: UsersService, private dialog: MatDialog) { }


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTrips();
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  getTrips(): void {
    this.users = this.usersService.getUsers();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  

}
