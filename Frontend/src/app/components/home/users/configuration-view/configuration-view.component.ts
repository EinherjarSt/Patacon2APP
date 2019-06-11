import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model-classes/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: "app-configuration-view",
    templateUrl: "./configuration-view.component.html",
    styleUrls: ["./configuration-view.component.css"]
  })
export class ConfigurationViewComponent implements OnInit {
    private userId;
    private user: User;
    constructor(private route: ActivatedRoute,
        private userService: UsersService) { }

  ngOnInit() {
      this.user = new User();
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(this.userId).subscribe(user=>{
        this.user = user;
    });
  }
  



}
