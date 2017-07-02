import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NetService } from "./../../providers/NetService";
import { App } from 'ionic-angular';
import { NavController, LoadingController } from 'ionic-angular';
import { ActivityDetailPage } from './activity_detail';
import { ActivityService } from "./../../providers/ActivityService";

@Component({
  selector: 'my-activities',
  templateUrl: 'my-activities.html'
})
export class MyActivities {

  @Input("homeActivities") homeActivities: any[];

  constructor(
    private app: App
  ) {
  }

  ngOnInit() {
  }

  enterPage(event, id) {
    //this.navCtrl.push(SearchPage, {id: id}, { animate: true, animation: 'transition', duration: 500, direction: 'forward' });
    //console.log(this.app.getRootNav());
    //this.app.getRootNav().push(SearchPage, { id: id });
    this.app.getRootNav().push(ActivityDetailPage, { id: id },
      { animate: true, animation: 'transition', duration: 600, direction: 'forward' });
  }
}
