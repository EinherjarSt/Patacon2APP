import { Injectable } from '@angular/core';
import { User } from '../model-classes/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dataUrl = 'http://localhost:1234/fake_user_data.json';
  USERS:User[] = [
    {run: "11.111.111-3", name: "Fernanda", surname : "Lopez", surname2 :"Gallegos", email : "ejemplo@gmail.com", password: "1111"}



    
  ]

  constructor() { }

  getUsers() {
    return this.USERS;
  }


}
