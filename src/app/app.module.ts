import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { FanDetailPage } from '../pages/profile/fan_detail';
import { ManagementPage } from '../pages/management/management';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from "@angular/http";
import { ToastService } from "../providers/ToastService";
import { ActivityService } from "../providers/ActivityService";
import { IonicStorageModule } from '@ionic/storage';
import { JwtHelper } from "angular2-jwt";
import { MySlide } from '../components/my-slide/my-slide';
import { MyActivities } from '../components/my-activities/my-activities';
import { ActivityDetailPage } from '../components/my-activities/activity_detail';
import { UserInfoService } from "../providers/UserInfoService";

import { NetService } from "../providers/NetService";
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ManagementPage,
    TabsPage,
    ActivityDetailPage,
    FanDetailPage,
    MySlide,
    MyActivities
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ActivityDetailPage,
    FanDetailPage,
    TabsPage,
    ManagementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastService,
    NetService,
    JwtHelper,
    ActivityService,
    UserInfoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
