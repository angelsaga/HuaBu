import { Component } from '@angular/core';
import { Platform, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  constructor(private platform: Platform, 
              private statusBar: StatusBar, 
              private splashScreen: SplashScreen, 
              private storage: Storage, 
              private jwtHelper: JwtHelper,
              private ionicApp: IonicApp
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      if (window.plugins && window.plugins.MiPushPlugin) {
          window.plugins.MiPushPlugin.init();         
      }

      storage.get('token').then(token => {
          if (!token || jwtHelper.isTokenExpired(token)) {  
            this.rootPage = LoginPage;
              setTimeout(function() {
                splashScreen.hide();
            }, 1000); 
          }else{
            this.rootPage = TabsPage;
            splashScreen.hide();
          }       
        });        
    });
  }


}
