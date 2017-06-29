import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
  constructor(public toastCtrl: ToastController) {}

  public showToast(msg: string){
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        toast.present();
  }
}