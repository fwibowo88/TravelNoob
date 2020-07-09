import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService:AuthService,
    private router:Router){}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  canLoad(
    route: Route, segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.authService.isLoggedIn){
        this.router.navigateByUrl('/auth');
      }
      return this.authService.isLoggedIn;
    }
  
}
