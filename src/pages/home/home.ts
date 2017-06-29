import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { SearchPage } from './search';
import { NetService } from "./../../providers/NetService";
import { App } from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  pageIndex: number = 0;
  pageContent: string;
  pageSlides: string[] = ['热门活动'];
  pageHttpSlides: string[] = ['activity'];
  homeActivities = [];

  public picture: string;
  public loading;

  constructor(private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private netSer: NetService,
    private app: App) {


    //this.saveHomeActivities();
  }

  ngOnInit() {
    this.onSlideClick(0);
  }

  setHomeActivities(data) {
    this.homeActivities = [];
    for (var item in data) {
      this.homeActivities.push({
        title: data[item].title,
        created: data[item].created,
        abstract: data[item].abstract,
        thumbnail_pic: data[item].thumbnail_pic[0],
        user_fans_count: data[item].user_fans_count,
        id: data[item]._id
      })
    }
  }

  saveHomeActivities() {

    for (var i = 0; i <= 15; i++) {
      var data = {
        title: '全球最大飞艇“飞天屁股”终试飞成功' + i,
        thumbnail_pic: ['http://img3.cache.netease.com/photo/0006/2017-06-15/CMVINKE517KK0006.jpg'],
        description: '据英国《每日邮报》6月14日报道，于去年8月24日试飞失败的全球最大飞行器Airlander 10，也就是因其奇特外形被网友戏称为“飞天屁股”的飞艇，在当地时间本周二下午6点05分终于试飞成功。这次飞行在达到创纪录的高度3800英尺（约1.2千米）。',
        author: '163.com'
      }

      this.netSer.saveActivity(data)
        .then(
        (data) => {
          console.log(data);
        })
        .catch(
        (err) => {
          console.log(err);
        }
        )
    }
  }


  onSlideClick(index) {
    this.pageIndex = index;
    this.getNewActivities(index);
  }

  setPageContent() {
    this.pageContent = this.pageHttpSlides[this.pageIndex];
  }



  getNewActivities(itemName) {
    this.setPageContent();
    this.loading = this.loadCtrl.create({
      content: '加载中...',
      duration: 3000
    });
    this.loading.present();
    this.netSer.listActivity()
      .then(
      (data) => {
        console.log(data);
        this.setHomeActivities(data);
        this.loading.dismiss();
      })
      .catch(
      (err) => {
        console.log(err);
        this.loading.dismiss();
      }
      )
  }


  doRefresh(refresher) {

    setTimeout(() => {
      this.getNewActivities(this.pageContent);
      refresher.complete();
    }, 3000);

  }

  enterPage(event, id) {
    //this.navCtrl.push(SearchPage, {id: id});
    this.app.getRootNav().push(SearchPage, { id: id });
  }
}








