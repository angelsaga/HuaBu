import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfoService } from "./../../providers/UserInfoService";
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';  
import { Storage } from "@ionic/storage";
import { FanDetailPage } from "./fan_detail";
import { NetService } from "../../providers/NetService";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UserInfoService]
})
export class ProfilePage {
  public username: String;
  public userinfo;
  constructor(public navCtrl: NavController,
              private userInfoService: UserInfoService,
              private netService: NetService,
              public app: App,
              storage: Storage) {
                this.app = app;
                storage.get('username').then((val) => {
                    this.username = val;
                    return val;
                  })
  }

ngOnInit() {
    this.netService.getUserinfo().then(
      (data) => {
        console.log(data);
        this.userinfo = data[0];
      }
    );
    //this.activityService.saveHomeActivities();
  }


  logout(_event) {
    _event.preventDefault();
    this.userInfoService.logout();
    this.app.getRootNav().setRoot( LoginPage );  
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }

  enterFanPage(event, id) {
    //this.navCtrl.push(SearchPage, {id: id}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    //console.log(this.app.getRootNav());
    //this.app.getRootNav().push(SearchPage, { id: id });
    this.app.getRootNav().push(FanDetailPage, { id: id },
      { animate: true, animation: 'transition', duration: 600, direction: 'forward' });
  }

}
