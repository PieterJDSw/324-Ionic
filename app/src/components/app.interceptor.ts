import { Injectable } from '@angular/core';
import {
         HttpRequest,
         HttpHandler,
         HttpEvent,
         HttpInterceptor
       } from '@angular/common/http';
import { AppServiceComponent } from '../components/app.service';
import { Observable } from 'rxjs';
// import all the needed modules to use for the interceptor

@Injectable() // set this component as injectable, inject code
export class AppInterceptor implements HttpInterceptor {
    constructor(public service: AppServiceComponent) {} // constructor, creates object of AppService to be use with "service"

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // interceptor method, receives request and handler, of type observable
        request = request.clone({  // clones request for altering
          setHeaders: {  // set the headers of the new cloned request
            Authorization: `${this.service.getToken()}`  // value to be saved in header, in this case the token
          }
        });
        return next.handle(request);  //returns the next handler, ready for next request
      }
    }
