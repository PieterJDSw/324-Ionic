import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { LecQR } from '../lec-qr/lec-qr';
import { UserQR } from './../user-qr/user-qr';

@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {
  tab1Root = UserQR;
  tab2Root = LecQR;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform) {
      this.platform = platform;
    }
  
    exitApp() {
      this.platform.exitApp();
    }
}
