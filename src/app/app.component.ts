import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { AuthenticationProvider } from '../providers/authentication/authentication';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { HTTP } from '@ionic-native/http';
import * as Constants from './constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;
  options: PushOptions;
  pushObject: PushObject;
  regID: any;

  constructor(private http: HTTP, private push: Push, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authentication: AuthenticationProvider) {
    if (!this.authentication.isLoggedIn()) {
      this.rootPage = LoginPage;
    }
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    this.options = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    this.pushObject = this.push.init(this.options);
    
    this.pushObject.on('notification').subscribe((notification) => {
      alert('notification');
        this.http.get(Constants.API_URL + 'stars/TomHanks', {}, { Authorization: 'Bearer ' + this.authentication.getToken() }).then(data => {
          console.log(data);
          this.nav.setRoot('StarPage', {
          star: data[0]
        });
      }, err => {
        console.log(err);
      }).catch(err => {
        console.log(err);
      });


    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });

  }

  logout = function () {
    this.authentication.logout();
    this.nav.setRoot(LoginPage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
