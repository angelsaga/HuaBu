import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ManagementPage } from '../management/management';
import { Tabs } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  tab1Root: any = HomePage;
  tab2Root: any = ProfilePage;
  tab3Root: any = ManagementPage;
  is_admin: boolean = false;
  constructor(
    private storage: Storage,
    private jwtHelper: JwtHelper) {
    this.isAdmin();
  }

  isAdmin(){
    this.storage.get('token').then((data) => {
      let token = this.jwtHelper.decodeToken(data);
      this.is_admin = token.is_admin;
    });
  }



}
