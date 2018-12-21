import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarPage } from '../star/star';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { RegisterPage } from '../register/register';
import { ListPage } from '../list/list';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  log: String;
  loginData: any = {};

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public authentication: AuthenticationProvider) {
  }

  doLogin = function () {
    this.log = "";
    this.authentication.login({
      email: this.loginData.username,
      password: this.loginData.password
    }).then(function () {
      this.isLoggedIn = this.authentication.isLoggedIn();
      this.navCtrl.setRoot(ListPage);
    }.bind(this), function (err) {
      this.alertCtrl.create({
        title: 'Failed to login',
        subTitle: JSON.parse(err.error).message,
        buttons: ['Try again']
      }).present();
    }.bind(this)).catch(function (err) {
      console.log(err);
    });
  };

  toRegister = function () {
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
