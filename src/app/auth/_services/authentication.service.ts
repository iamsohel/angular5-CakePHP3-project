import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import { Helpers } from '../../helpers';



@Injectable()
export class AuthenticationService {

    constructor(private http: HttpService, private _cookie: CookieService,
        private router: Router) {
    }

    login(email: string, password: string) {
        return this.http.post('users/login', { email: email, password: password })
            .map((response) => {
                console.log(response);
                // login successful if there's a jwt token in the response
                const user = typeof response !== 'object' ? response.json().result.data : response.result.data;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.login_type = 'email';
                    this._cookie.putObject('currentUser', user);
                    //localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        this._cookie.remove('currentUser');
        //localStorage.removeItem('currentUser');
    }

    setUser(data) {
        this._cookie.putObject('currentUser', data);
    }
}