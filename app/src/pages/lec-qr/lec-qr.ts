import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppServiceComponent } from './../../components/app.service';
import * as jwt_decode from 'jwt-decode';
// import needed modules

@Component({ // indicated role, component
  selector: 'page-lec-qr',
  templateUrl: 'lec-qr.html'
})
export class LecQR {
  createdCode = null; // varibales to be used \/
  token;
  subjects: Array<{}> = []; // array for string subject from backend
  subjectPicked;
  timePicked;
  codeFinal;
  id;
  timeGenerated;
  constructor(public navCtrl: NavController,
              private service: AppServiceComponent) { // object for use of modules as navCtrl and service

    this.service.getSubjects() // calls service method to get subjects
      .subscribe(
        (response) => { // response from backend and fires fuction
          let arr = 0; // counter variable
          while (response[arr] != null) { // wile to run throu response
            this.subjects.push(response[arr]); // push value to array for every response entry
            arr++; // increment counter
          }
        },
        (error) => console.log(error)); // logs errors form backend
    }

  createCode() { // method to create a new QR code
    if (sessionStorage.length === 0) { // tests for active log-in
      alert('Please Log-In.'); // id false prompt for log-in
    } else if (sessionStorage.length > 0) { // tests for active log-in, if true continues
      this.token = jwt_decode(sessionStorage.getItem('token')); // used jwt_decode (imported above) to decode the token
      if (this.token.dosent === 0) { // tests if logged-in user is a lecturer
        alert('Must be a lecturer.'); // if false tell's user
      } else if (this.token.dosent === 1) { // tests if logged-in user is lecturer
        if (this.subjectPicked != null && this.timePicked != null) {
          this.timeGenerated = new Date().getTime(); // sets generated time as current time in miliseconds
          let arr = 0; // counter variable
          while (this.subjects[arr] != null) { // while to run through subjects array
            // @ts-ignore // ignore next lint
            if (this.subjectPicked === this.subjects[arr].ModuleCode) { // tests if subject picked by user maches a subject in the array
              // @ts-ignore // ignore next lint
              this.id = this.subjects[arr].ModuleId; // if true sets ID to that subjects ID
            }
            arr++; // increment counter
          }
          this.createdCode = this.id + ' ' + this.subjectPicked + ' ' + this.timePicked + ' ' + this.timeGenerated; // sets QR data as ID, subject, time and generated time
        } else {
          alert('Ensure both a subject and time is selected to generate a code.');
        }
      }
    }
  }
}
