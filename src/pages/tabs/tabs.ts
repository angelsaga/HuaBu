import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ManagementPage } from '../management/management';
import { Tabs } from 'ionic-angular';
import { UserInfoService } from "./../../providers/UserInfoService";

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
    private userInfoService: UserInfoService) {
      userInfoService.isAdmin().then((d) =>{
        this.is_admin = d;
      });
  }

}
