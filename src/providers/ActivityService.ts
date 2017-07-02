import { Injectable } from '@angular/core';
import { NetService } from "./NetService";
import { App } from 'ionic-angular';
import { NavController, LoadingController } from 'ionic-angular';


@Injectable()
export class ActivityService {
    public loading;
    public homeActivities = [];

    constructor(
        private loadCtrl: LoadingController,
        private netSer: NetService,
        private app: App) {

    };

    getActivityByUser() {
        var promise = new Promise((resolve, reject) => {
            this.loading = this.loadCtrl.create({
                content: '加载中...',
                duration: 3000
            });
            this.loading.present();
            this.netSer.getActivityByUser()
                .then(
                (data) => {
                    console.log(data);
                    this.setHomeActivities(data);
                    this.loading.dismiss();
                    resolve(data);
                })
                .catch(
                (err) => {
                    this.loading.dismiss();
                    reject(err);
                }
                )
        })
        return promise;

    }


    getNewActivities() {
        var promise = new Promise((resolve, reject) => {
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
                    resolve(data);
                })
                .catch(
                (err) => {
                    this.loading.dismiss();
                    reject(err);
                }
                )
        })
        return promise;

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

    doRefresh(refresher) {
        var promise = new Promise((resolve, reject) => {
            this.getNewActivities()
                .then(
                (data) => {
                    resolve(data);
                    refresher.complete();
                })
                .catch(
                (err) => {
                    reject(err);
                    refresher.complete();
                }
            )
        })
        return promise;

    }

    doRefresh1(refresher) {
        setTimeout(() => {
            this.getNewActivities();
            refresher.complete();
        }, 3000);

    }

    getActivityDetial(id) {
        var promise = new Promise((resolve, reject) => {
            this.loading = this.loadCtrl.create({
                content: '加载中...',
                duration: 3000
            });
            this.loading.present();
            this.netSer.getActivityDetail({ id: id })
                .then(
                (data) => {
                    console.log(data);
                    resolve(data);
                    this.loading.dismiss();
                })
                .catch(
                (err) => {
                    console.log(err);
                    reject(err);
                    this.loading.dismiss();
                }
                )
        })
        return promise;
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


}