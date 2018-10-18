import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// impoer needed modules

@Injectable()
export class AppServiceComponent {

    constructor(private http:HttpClient) {} // object for use of HttpClientModule with http
  
    postloginData(value) {
      return this.http.post('http://192.168.1.7:3000/user/login', value); // use http as POST to given IP
    }
    postSubjectStart(value) {
      // const header = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://192.168.1.7:3000/hours/start', value); // use http as POST to given IP
    }
    postSubjectEnd(value) {
      // const header = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.post('http://192.168.1.7:3000/hours/end', value); // use http as POST to given IP
    }
    getSubjects() {
      return this.http.get('http://192.168.1.7:3000/subjects/get'); // use http as GET from given IP
    }
    getToken() {
      return sessionStorage.getItem('token'); // token send method for interceptor
    }
}