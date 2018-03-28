import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../_config/app';
import{HttpClient} from '@angular/common/http';
import { BaseResponseOptions } from '@angular/http/src/base_response_options';

@Injectable()
export class HttpService{
  config : AppConfig;

  constructor(private http : HttpClient){
      this.config = new AppConfig();
  }

  get (url:string, option?: any|null): Observable<any>{
      this.http.get(this.config.apiEndPoint+url, option);
  }

  post (url:string, body:any|null, options?: any|null): Observable<any>{
    this.http.post(this.config.apiEndPoint+url, body, options);
 }

put (url:string, body:any|null, options?: any|null): Observable<any>{
    this.http.put(this.config.apiEndPoint+url, body, options);
}

delete (url:string,  options?: any|null): Observable<any>{
    this.http.delete(this.config.apiEndPoint+url,  options);
}

}
