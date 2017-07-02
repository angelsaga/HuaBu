import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { NetService } from "./../../providers/NetService";
import { ActivityService } from "./../../providers/ActivityService";

@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity_detail.html'
})

export class ActivityDetailPage {
  @ViewChild(Navbar) navBar: Navbar;

  ActivitieDetail;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private netSer: NetService,
    private activityService: ActivityService) {
  }

  ngOnInit() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop(
        { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    }
    this.getActivityDetial(this.navParams.data.id);
  }


  getActivityDetial(id) {
    this.activityService.getActivityDetial(id).then(
      (data) => {
      this.ActivitieDetail = data;
      });
  }

  changeLike() {
    this.netSer.changeActivityDetailLike({
      _id: this.ActivitieDetail._id,
      liked: this.ActivitieDetail.liked
    }).then(
      (data) => {
        if (this.ActivitieDetail.liked) {
          this.ActivitieDetail.user_fans_count--;
          this.ActivitieDetail.liked = false;
        } else {
          this.ActivitieDetail.liked = true;
          this.ActivitieDetail.user_fans_count++;
        }
      })
      .catch(
      (err) => {
        console.log(err);
      }
      )
  }

  closePage() {
    //this.navCtrl.pop();
    this.navCtrl.popToRoot(
      { animate: true, animation: 'transition', duration: 200, direction: 'back' });
  }
}
