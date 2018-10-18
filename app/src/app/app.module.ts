import { AppServiceComponent } from '../components/app.service';
import { AppInterceptor } from '../components/app.interceptor';
import { QrPage } from './../pages/qr/qr';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import modules needed
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { UserQR } from '../pages/user-qr/user-qr';
import { LecQR } from '../pages/lec-qr/lec-qr';
// import modules for use of pages
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
// extra modules for app

@NgModule({
  declarations: [
    MyApp, // declarations for pages \/
    HomePage,
    LoginPage,
    QrPage,
    UserQR,
    LecQR
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule, // import to use HttpClient, for CRUD
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, // import for all pages on the app \/
    HomePage,
    LoginPage,
    QrPage,
    UserQR,
    LecQR
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    },
    BarcodeScanner, // provider for barcode scanner
    AppServiceComponent, // provider for the serive component
    { // providers for the interceptor module imported above
      provide: HTTP_INTERCEPTORS, 
      useClass: AppInterceptor, 
      multi: true // indicated ability to preform multiple "provides"
    }
  ]
})
export class AppModule {}
