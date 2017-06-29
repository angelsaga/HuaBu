import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import { UserInfoService } from "./../../providers/UserInfoService";
import { emailValidator } from './../../providers/validator'
import { Storage } from "@ionic/storage";
declare var window;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserInfoService]
})
export class LoginPage {
  loginForm: any;
  loginedUser: String = '';
  public resetInfo: String = '找回';
  public needInputVerifyCode: boolean = false;
  public loading;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private loadCtrl:LoadingController,
    storage: Storage) {

    this.loading = this.loadCtrl.create({
      content: '加载中...',
    });    

    this.loginForm = this.formBuilder.group({
      'username': [this.loginedUser, [Validators.required, Validators.minLength(4), emailValidator]],
      'password': ['', [Validators.required, Validators.minLength(4)]],
      'verifycode': ['']
    });

    storage.get('username').then(username => {
      if(username){
        this.loginForm = this.formBuilder.group({
          'username': [username, [Validators.required, Validators.minLength(4), emailValidator]],
          'password': ['', [Validators.required, Validators.minLength(4)]],
          'verifycode': ['']
        })
      }
    }); 
  }

  ionViewDidLoad() {
    console.log('Hello Login Page');
  }

  login(user, _event) {
    _event.preventDefault();
    this.userInfoService.login(user);
  }

  signup(user, _event) {
    _event.preventDefault();
    this.userInfoService.signup(user);
  }


  pressEvent(user, e) {
    if(this.resetInfo == "长按以确定"){
      this.resetInfo = '取消';
      this.userInfoService.reset(user);
      this.needInputVerifyCode = true;
    }
  } 
  tapEvent(e) {
    if(this.resetInfo == "找回"){
      this.resetInfo = '长按以确定';
    }else if(this.resetInfo == "取消"){
      this.resetInfo = '找回';
      this.needInputVerifyCode = false;
    }
    
  }

}
