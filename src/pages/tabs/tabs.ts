import { Component, ViewChild } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { Tabs } from 'ionic-angular';
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;
  tab1Root: any = HomePage;
  tab4Root: any = ProfilePage;
  constructor() {}



}
