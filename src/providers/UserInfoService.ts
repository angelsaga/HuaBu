import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import { ToastService } from "./ToastService";
import 'rxjs/add/operator/map';
import { App, LoadingController } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { AppConfig } from '../app/app.config';

@Injectable()
export class UserInfoService {
  private rest_api_base_url = AppConfig.getBaseUrl();
  private LOGIN_URL = this.rest_api_base_url + "/user/login";
  private SIGNUP_URL = this.rest_api_base_url + "/user/register";
  private SENDVCODE_URL = this.rest_api_base_url + "/user/sendvcode";

  // We need to set the content type for the server
  contentHeader = new Headers({ "Content-Type": "application/json" });
  error: string;
  jwtHelper = new JwtHelper();
  public user: string;
  public loading;
  public is_admin : boolean;

  constructor(private http: Http,
    private storage: Storage,
    private app: App,
    public toastService: ToastService,
    private loadCtrl: LoadingController) {
    this.loading = this.loadCtrl.create({
      content: '加载中...',
    });
  }  

  login(credentials) {
    this.loading.present();
    this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
      data => this.authSuccess(data.token),
      err => {
        this.loading.dismiss();
        this.error = err;
        if (err.status == '401') {
          this.toastService.showToast('用户或密码错误')
        } else if (err.status == '403') {
          this.toastService.showToast('验证码错误')
        } else if (err.status == '404') {
          this.toastService.showToast('验证码失效，请按取消重新找回')
        } else {
          this.toastService.showToast('请检查网络或安全设置')
        }
      }
      );
  }

  signup(credentials) {
    this.loading.present();
    this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
      data => this.authSuccess(data.token),
      err => {
        this.loading.dismiss();
        this.error = err;
        if (err.status == '500') {
          this.toastService.showToast('这个邮箱已经注册过了')
        } else {
          this.toastService.showToast('请检查网络或安全设置')
        }
      }
      );
  }

  reset(credentials) {
    this.loading.present();
    this.http.post(this.SENDVCODE_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
      data => {
        this.loading.dismiss();
        this.toastService.showToast('一封邮件已经发送到您的邮箱，请查阅')
      },
      err => {
        this.loading.dismiss();
        this.error = err;
        if (err.status == '500') {
          this.toastService.showToast('发送失败')
        } else if (err.status == '402') {
          this.toastService.showToast('前次发送的验证码仍未失效，请查阅邮箱')
        } else {
          this.toastService.showToast('请检查网络或安全设置')
        }
      }
      );
  }

  logout() {
    this.storage.remove('token');
  }

  authSuccess(token) {
    this.error = null;
    this.storage.set('token', token).then((any) => {
      let token_dec = this.jwtHelper.decodeToken(token);
      this.user = token_dec.username;
      this.is_admin = token_dec.is_admin;
      this.storage.set('username', this.user).then((any) => {
        this.app.getRootNav().setRoot(TabsPage);
        this.loading.dismiss();
      });
    });;


  }

  isAdmin(){
      return this.storage.get('token').then((data) => {
        let token = this.jwtHelper.decodeToken(data);
        return token.is_admin;
      });
  }

}