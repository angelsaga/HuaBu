import { Component, ViewChild } from '@angular/core';

// import { ViewController } from 'ionic-angular'
import { NavController, NavParams, Navbar, LoadingController } from 'ionic-angular';
import { NetService } from "./../../providers/NetService";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  @ViewChild(Navbar) navBar: Navbar;

  loading;
  ActivitieDetail;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadCtrl: LoadingController,
    private netSer: NetService, ) {
  }

  ngOnInit() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.navCtrl.pop(
        { animate: true, animation: 'transition', duration: 500, direction: 'back' });
    }
    this.getActivityDetial(this.navParams.data.id);
  }

  getActivityDetial(id) {
    this.loading = this.loadCtrl.create({
      content: '加载中...',
      duration: 3000
    });
    this.loading.present();
    this.netSer.getActivityDetail({ id: id })
      .then(
      (data) => {
        console.log(data);
        this.ActivitieDetail = data;
        this.loading.dismiss();
      })
      .catch(
      (err) => {
        console.log(err);
        this.loading.dismiss();
      }
      )
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
