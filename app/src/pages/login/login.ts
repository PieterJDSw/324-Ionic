import { HomePage } from './../home/home';
import { AppServiceComponent } from './../../components/app.service';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
// import needed modules

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController,
    private service: AppServiceComponent,
    private platform: Platform) { } // objects for use of modules with navCtrl, service and platform
    
  // userData = {}; // emty object to capture user data
  // tokenDecoded;
  logForm(form: NgForm) { // logForm method called from HTML side with form data as ngForm
    if (sessionStorage.length > 0) { // tests for active log-in
      alert('Already logged in.'); // if false prompts for log-in
    } else if (sessionStorage.length === 0) { // tests for active log-in
      this.service.postloginData(form.value) // calls post method from service component with form data value
      .subscribe(response => { // response from backend
        sessionStorage.clear(); // clears log-in in case of active token
        // @ts-ignore // ignores next lint
        sessionStorage.setItem('token', response.body); // stores response in session storage, in this case the token from active log-in
        this.navCtrl.setRoot(HomePage); // sets the new root page for te app, in this case home-page
    },
      (error) => console.log(error)); // logs any errors from backend
    }
  }

  exitApp() { // method for closing the app, called from button
    this.platform.exitApp(); // calls platforms exitApp() method
  }
}