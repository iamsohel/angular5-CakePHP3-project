import { AuthService } from './../../_services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";



@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService, private auth : AuthService) {
    }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       if(state.url != '/login'){
         this.observeStatus();
        }
        if(this.auth.authenticated){
            return true;
        }
        else{
            this._router.navigate(['/login']).then();
            return false;
        }
    }


    observeStatus() : void{
        this._userService.checkStatus().subscribe(value =>{
            if(!value){
                this._router.navigate(['/login']).then();
            }
        });
    }
}