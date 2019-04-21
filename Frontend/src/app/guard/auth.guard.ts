import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth:AuthService) { }

  /**
   * Verify if exist in localstorage a var named access_token. If it don't exist the user is
   * redirect to login page.
   * @param next 
   * @param state 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
      return true;
    }
  
}