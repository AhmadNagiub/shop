/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageToken: LocalStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.localStorageToken.getToken();

      if (token) {
        const tokenDecode = JSON.parse(atob(token.split('.')[1])); // atob => is a decoding method
        // token consist of 3 parts that seperated by . =>  . my info that i bring .  => see in jwt.io
        if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)) return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
  
    private _tokenExpired(expiration:any): boolean {
      return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
  }
  

