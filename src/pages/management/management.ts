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
  _id: String;
  edit_mode: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private netSer: NetService) {
  }

  ionViewDidLoad() {
    if(this.navParams && 'data' in this.navParams &&
    'data' in this.navParams.data){
      console.log(this.navParams);
      this.title = this.navParams.data.data.title;
      this.thumbnail_pic = this.navParams.data.data.thumbnail_pic.join(' ');
      this.description = this.navParams.data.data.description;
      this.author = this.navParams.data.data.author;
      this._id = this.navParams.data.data._id;
      this.edit_mode = true;
    }else{
      this.edit_mode = false;
    }
  }

  saveHomeActivity() {
    if(this.edit_mode){
      this.updateHomeActivity();
    }else{
      this.insertHomeActivity();
    }
  }

  updateHomeActivity() {
    var data = {
      title: this.title,
      thumbnail_pic: this.thumbnail_pic ? 
                this.thumbnail_pic.split(/\s+/) : [],
      description: this.description,
      author: this.author,
      _id: this._id
    }
    console.log(data);
    this.netSer.updateActivity(data)
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

  insertHomeActivity() {
    var data = {
      title: this.title,
      thumbnail_pic: this.thumbnail_pic ? 
            this.thumbnail_pic.split(/\s+/) : [],
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
