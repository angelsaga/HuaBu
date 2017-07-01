import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
  constructor(public toastCtrl: ToastController) {}

  public showToast(msg: string, duration=3000){
        let toast = this.toastCtrl.create({
          message: msg,
          duration: duration,
          position: 'top',
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        toast.present();
  }
}