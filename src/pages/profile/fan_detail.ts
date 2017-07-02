import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar } from 'ionic-angular';
import { ActivityService } from "./../../providers/ActivityService";
@Component({
  selector: 'page-fan-detail',
  templateUrl: 'fan_detail.html'
})

export class FanDetailPage {
  @ViewChild(Navbar) navBar: Navbar;
  homeActivities = [];
  constructor(
    public navCtrl: NavController,
    private activityService: ActivityService) {
  }

  ngOnInit() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop(
        { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    }
    this.activityService.getActivityByUser()
      .then(
      (data) => {
        this.homeActivities = this.activityService.homeActivities
      })
  }

}
