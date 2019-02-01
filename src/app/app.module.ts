import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { NavComponent } from '../components/nav/nav';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { BrowserXhr } from '@angular/http';
import { CustExtBrowserXhr } from './cust-ext-browser-xhr';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { SOCKET_URL } from './constants';
const config: SocketIoConfig = { url: SOCKET_URL, options: {} };
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Push, PushObject } from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    NavComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config), 
    AngularFirestoreModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    NavComponent
  ],
  providers: [
    HTTP,
    InAppBrowser,
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: BrowserXhr, useClass:CustExtBrowserXhr},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    UniqueDeviceID,
    Push
  ]
})
export class AppModule {}
