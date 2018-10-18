import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppServiceComponent } from './../../components/app.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// import of needed modules

@Component({ // indicates use of component as component
  selector: 'page-user-qr',
  templateUrl: 'user-qr.html'
})
export class UserQR {
  scannedCode = null; // series of variables created for use \/
  subject;
  subjectOutput;
  id;
  timeGenerated;
  expire;
  time;
  currentTime;
  subjects: Array<{}> = []; // array created for stroing subject from backend as array

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private service: AppServiceComponent) { // objects for use of modules as navCtrl, barcodeScanner and service

      // runs when component is loaded due to position in constructor          
      this.service.getSubjects() // calls get method in service component
      .subscribe(
        (response) => { // hols response from backend, also a function
          let arr = 0;  // counter variable
          while (response[arr] != null) {  // while to populate subjects array
            this.subjects.push(response[arr]); // pushes new value onto array subjects
            arr++; // increment counter
          }
        },
        (error) => console.log(error)); // logs any error from backend
      }

  scanCode() { // method to scan a QR code
    if (sessionStorage.length === 0) { // tests for active log-in
      alert('Please Log-In.'); // if non is found prompt for log-in
    } else if (sessionStorage.length > 0) { // tests for active log-in
      this.barcodeScanner.scan().then(barcodeData => { // if log-in found scan barcode and run response function
        this.scannedCode = barcodeData.text; // sets scannedCode as value of QR
        this.subject = this.scannedCode.split(" "); // creates array of split QR data at " "
        this.subjectOutput = this.subject[1]; // sets subject as array index one of subject array
        this.timeGenerated = this.subject[4]; // sets time as array index of subject array
        this.currentTime = new Date().getTime(); // gets current time from Date() method
        const el = <HTMLInputElement>document.getElementById('btnQR2'); // re-activates button by ID after scan
        el.disabled = false; // sets disbaled as false for button calling scanCode() /\
      },
        (error) => console.log(error) // logs any error from backend
      );
    }
  }

  postScan() {
    const scanData: any = { "ModuleCode": this.subject[1], "ModuleId": this.subject[0] }; // creates JSON object to post to backend with given variables
    this.expire = (this.currentTime - this.timeGenerated) / 100; // gets expire time of QR code by subtracting generation time from current time
    if (this.expire <= 1800) { // test for expire time length, no longer that 30min or 1800 seconds
      if (this.subject[3] === 'End' || this.subject[3] === 'Start') { // tests if QR scan result contains "start" or "end" based on index
        if (this.subject[3] === 'Start') { // tests if QR result contains "start"
          this.service.postSubjectStart(scanData) // if true calls service method to post JSON object /\
            .subscribe(response => { // response fr0om backend and fires function
              // @ts-ignore // ignore's next line lint
            alert(response.message); // alert app user with response message form backend
          },
            (error) => console.log(error) // logs any errors from backend
          );
        }
        
        if (this.subject[3] === 'End') { // tests if QR result contains "end"
          this.service.postSubjectEnd(scanData) // if true calls service method to post
            .subscribe(response => { // response fr0om backend and fires function
              // @ts-ignore // ignore's next line lint
            alert(response.message); // alert app user with response message form backend
          },
            (error) => console.log(error) // logs any errors from backend
          );
        }
      } else if (this.subject[3] != 'End' || this.subject[3] != 'Start') { // test if QR result does NOT contain "start" or "end"
        alert('Unrecognized code scanned, please try again.'); // if true indicates to user that the wrong QR code was scanned
      }
    } else if (this.expire > 1800) { // test if expire time if NOT within 30min
      alert('QR code expired, please try again.'); // if true, tell's user that QR has expired
    }
  }
}