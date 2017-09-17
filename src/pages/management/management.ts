import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetService, Activity } from "../../providers/NetService";

/**
 * Generated class for the ManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-management',
  templateUrl: 'management.html',
})
export class ManagementPage {
  title: String;
  description: String;
  thumbnail_pic: String;
  author: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private netSer: NetService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagementPage');
  }

  saveHomeActivity() {
    var data = {
      title: this.title,
      thumbnail_pic: this.thumbnail_pic.split(/\s+/),
      description: this.description,
      author: this.author
    }
    console.log(data);
    this.netSer.saveActivity(data)
      .then(
      (data) => {console.log(data);
        console.log(data);
      })
      .catch(
      (err) => {
        console.log(err);
      }
    )
  }

}
