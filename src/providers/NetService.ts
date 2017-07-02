import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import { ToastService } from "./ToastService";
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AppConfig } from '../app/app.config';

@Injectable()
export class NetService {
    private rest_api_base_url = AppConfig.getBaseUrl();
    private ACTIVELIST_URL = this.rest_api_base_url + "/activity/list";
    private ACTIVESAVE_URL = this.rest_api_base_url + "/activity/save";
    private ACTIVEDETIAL_URL = this.rest_api_base_url + "/activity/detial";
    private ACTIVEDETIALLIK_URL = this.rest_api_base_url + "/activity/detiallike";
    private ACTIVELISTBYUSER_URL = this.rest_api_base_url + "/activity/userfanlist";
    private INFO_URL = this.rest_api_base_url + "/user/info";

    // We need to set the content type for the server
    contentHeader = new Headers({"Content-Type": "application/json"});
    error: string;   
    jwtHelper = new JwtHelper();
    public user: string;
    public loading;
    
    constructor(private http: Http, 
                private storage: Storage, 
                private app: App, 
                public toastService: ToastService) {
    }

  listActivity(limit: number = 10, skip: number = 0) {
  
    var option = {
        'limit' : limit,
        'skip' :　skip
      }

    var promise = new Promise((resolve, reject) => {
      this.http_get_with_token(this.ACTIVELIST_URL, option)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  saveActivity(activty) {
    var promise = new Promise((resolve, reject) => {
      this.http_post_with_token(this.ACTIVESAVE_URL, activty)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  getActivityDetail(activty) {
    var promise = new Promise((resolve, reject) => {
      this.http_get_with_token(this.ACTIVEDETIAL_URL, activty)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  getActivityByUser() {
    var promise = new Promise((resolve, reject) => {
      this.http_get_with_token(this.ACTIVELISTBYUSER_URL, null)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  getUserinfo() {
    var promise = new Promise((resolve, reject) => {
      this.http_get_with_token(this.INFO_URL, null)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  changeActivityDetailLike(activty) {
    var promise = new Promise((resolve, reject) => {
      this.http_post_with_token(this.ACTIVEDETIALLIK_URL, activty)
      .then(
        (data) => {
          resolve(data);
        })
      .catch(
        (err) => {
          reject(err);
        }
      )
    })
    return promise;  
  }

  http_get_with_token(url: string, option: any){
    var promise = new Promise((resolve, reject) => {
      this.getauthHeader()
        .then(
          (token) => {
            //Set get params
            let params: URLSearchParams = new URLSearchParams();
            for(var key in option){
              params.set(key, option[key])
            }
            //Set auth token
            var authHeader = this.contentHeader;
            authHeader.set('Authorization', 'Bearer ' + token);

            this.http.get(url, { headers: authHeader, search: params})
              .map(res => res.json())
              .subscribe(
                data => {
                          resolve(data);
                        },
                err => {
                          this.toastService.showToast('请检查网络或安全设置');
                          reject(err);
                      }
              );
          })
        .catch(
          (err) => {
            this.app.getRootNav().setRoot( LoginPage );
            reject(err);
	      }
      )
    })
    return promise;
  }

  http_post_with_token(url: string, option: any){
    var promise = new Promise((resolve, reject) => {
      this.getauthHeader()
        .then(
          (token) => {            
            //Set auth token
            var authHeader = this.contentHeader;
            authHeader.set('Authorization', 'Bearer ' + token);

            this.http.post(url, JSON.stringify(option), { headers: authHeader})
              .map(res => res.json())
              .subscribe(
                data => {
                          resolve(data);
                        },
                err => {
                          this.toastService.showToast('请检查网络或安全设置');
                          reject(err);
                      }
              );
          })
        .catch(
          (err) => {
            this.app.getRootNav().setRoot( LoginPage );
            reject(err);
	      }
      )
    })
    return promise;
  }


  getauthHeader() {
    var promise = new Promise((resolve, reject) =>{
      this.storage.get('token')
      .then(
        (token) => {
          resolve(token);
        })
      .catch(
        (err) => {
          reject(err);
        })
    })  
    return promise;      
  }



}