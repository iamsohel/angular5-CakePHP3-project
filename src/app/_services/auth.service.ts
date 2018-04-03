import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {CookieOptions, CookieService } from 'ngx-cookie';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthService implements CanActivate{
  
    cookieOptions : CookieOptions;
    constructor(private _cookies : CookieService, private router : Router){
            this.cookieOptions = {};
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(route.data.auth){
            const token = this.getToken();
            if(token){
                return true;
            }else{
                this.navigateTo('login').then();
                return false;
            }
        }
        return true;
    }

    checkLogin(): Observable<boolean | any> {
        return new Observable((observer) => {
          setInterval(() => {
            const user = this.getCookie('currentUser');
            if (user) {
              observer.next(user);
            } else {
              observer.next(false);
            }
          }, 1000);
        });
      }

    getToken() : string | boolean {
        const current_user = this. getCookie('currentUser');
        if(current_user){
            return current_user.token;
        }
         return false;
        
    }

    getCookie(name : string) : any{
        const cookie = this._cookies.getObject(name.trim());
        if(cookie){
            return cookie;
        }else{
            return false;
        }
    }

    setCookie (name : string, value :any) {
        this._cookies.putObject(name.trim(), value, this.cookieOptions);
    }

    removeCookie(name: string): void {
        this._cookies.remove(name, this.cookieOptions);
    }

    navigateTo(name : string ) : Promise<any>{
        const promise = this.router.navigate(['name']);
        return promise;
    }

    api(network: string, path: string) {
    }
  
}