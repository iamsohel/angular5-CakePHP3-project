import { CookieService } from 'ngx-cookie';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import 'rxjs/add/operator/map';

import { User } from "../_models/index";

@Injectable()
export class UserService {
    constructor(private http: Http, private _cookie : CookieService) {
    }
    user: any;

    verify() : Observable <any>{
        if(!this._cookie.getObject('currentUser')){
            return this.http.get('users/verify').map((response: Response) => response.json());
        } else{
            return new Observable<any>(observe => {
                setTimeout(() => {
                    observe.next({ status: 'ok' });
                  }, 100);
            });
        }
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.jwt()).map((response: Response) => response.json());
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
  checkStatus(): Observable<boolean> {
    return new Observable<any>(observer => {
      setInterval(() => {
        const user: any = this._cookie.getObject('currentUser');
        if (user) {
          if (user.token) {

            observer.next(true);
          } else {
            observer.next(false);
          }
        } else {
          observer.next(false);
        }
      });
    });
  }


    private jwt() {
        // create authorization header with jwt token
        const cUser = this._cookie.getObject('currentUser');
        let currentUser = '';
        if(cUser){
            this.user = cUser;
        }else{
            currentUser = null;
            this.user = null;
        }
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.user && this.user.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.user.token });
            return new RequestOptions({ headers: headers });
        }
    }
}