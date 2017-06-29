import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserInfoService } from "./../../providers/UserInfoService";
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';  
import { Storage } from "@ionic/storage";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserInfoService]
})
export class ProfilePage {
  public username: String;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userInfoService: UserInfoService,
              public app: App,
              storage: Storage) {
                this.app = app;
                storage.get('username').then((val) => {
                    this.username = val;
                    return val;
                  })
  }

  logout(_event) {
    _event.preventDefault();
    this.userInfoService.logout();
    this.app.getRootNav().setRoot( LoginPage );  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
