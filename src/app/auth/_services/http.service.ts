import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../_config/app';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BaseResponseOptions } from '@angular/http/src/base_response_options';

@Injectable()
export class HttpService{
  config : AppConfig;

  constructor(private http : HttpClient){
      this.config = new AppConfig();
  }

    get (url:string, option?: any|null): Observable<any>{
        return this.http.get(this.config.apiEndPoint+url, option);
    }

    post (url:string, body:any|null, options?: any|null): Observable<any>{
        return this.http.post(this.config.apiEndPoint+url, body, options);
    }

    put (url:string, body:any|null, options?: any|null): Observable<any>{
        return this.http.put(this.config.apiEndPoint+url, body, options);
    }

    delete (url:string,  options?: any|null): Observable<any>{
        return this.http.delete(this.config.apiEndPoint+url,  options);
    }

    getErrorMessage(err: HttpErrorResponse) {
        let message = '';
        console.log(err);
        if (err.error) {
            if (err.error.result) {
                message = err.error.result.error ? err.error.result.error : err.error.result.message;
            } else {
                message = err.message ? err.message : err.statusText;
            }
        }
        return message;
    }

}
