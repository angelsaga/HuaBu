import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastService } from "../providers/ToastService";
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  backButtonPressed: boolean = false;
  constructor(private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private jwtHelper: JwtHelper,
    private ionicApp: IonicApp,
    private toastService: ToastService,
    private app: App
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
          setTimeout(function () {
            splashScreen.hide();
          }, 1000);
        } else {
          this.rootPage = TabsPage;
          splashScreen.hide();
        }
      });
    });
    this.registerBackButtonAction();
  }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      return this.app.getRootNav().canGoBack() ? this.app.getRootNav().pop(
        { animate: true, animation: 'transition', duration: 200, direction: 'back' }
      ) : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastService.showToast('再按一次退出应用', 2000);
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

}
