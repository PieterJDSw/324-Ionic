import { QrPage } from './../pages/qr/qr';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// import needed modules

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; // set root page, in this case log-in page

  pages: Array<{title: string, component: any}>; // creates an emty array with objects;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for ngFor and navigation
    this.pages = [ // pages to be navigated to via the side menu
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage},
      { title: 'Hours', component: QrPage }
    ];
  }

  initializeApp() { // method that fires when the app is loaded
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available
      // Here you can do any higher level native things you might need
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
