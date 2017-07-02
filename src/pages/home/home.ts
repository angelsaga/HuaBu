import { Component } from '@angular/core';
import { ActivityService } from "./../../providers/ActivityService";

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  pageIndex: number = 0;
  pageSlides: string[] = ['热门活动'];
  homeActivities = [];

  constructor(
    private activityService: ActivityService) {
  }

  ngOnInit() {
    this.onSlideClick(0);
    //this.activityService.saveHomeActivities();
  }

  doRefresh(refresher) {
    this.activityService.doRefresh(refresher).then(
      (data) => {
        this.homeActivities = this.activityService.homeActivities
      }
    );
  }

  onSlideClick(index) {
    this.pageIndex = index;
    this.activityService.getNewActivities()
      .then(
      (data) => {
        this.homeActivities = this.activityService.homeActivities
      })
  }

}








