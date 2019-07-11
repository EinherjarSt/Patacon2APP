import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  constructor(public auth: AuthService, public router: Router, private jwtHelper:JwtHelperService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole1 = route.data.expectedRole1;
    const expectedRole2 = route.data.expectedRole2;
    const token: string = localStorage.getItem('access_token');
    const tokenPayload = this.jwtHelper.decodeToken(token);

    if (!this.auth.isAuthenticated() ) {
      this.router.navigate(['login']);
      return false;
    }
    else if(tokenPayload.position !== expectedRole1 && tokenPayload.position !== expectedRole2){
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
  
}
