import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarPage } from '../star/star';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { RegisterPage } from '../register/register';
import { ListPage } from '../list/list';
import { AlertController } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';

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
  deviceId: String;
  token: String;

  constructor(private platform: Platform, 
    public firebaseNative:Firebase, private uuid: UniqueDeviceID, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public authentication: AuthenticationProvider) {
    this.getToken().then(function (token) {
      this.token = token;
      console.log('thistoken', this.token);
    }.bind(this)).catch((err) => {
      console.log(err);
    });
    this.uuid.get()
      .then(function (uuid) { this.deviceId = uuid; }.bind(this)).catch((error) => console.log(error));
  }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebaseNative.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    console.log(token);
    return token;
  };

  doLogin = function () {
    this.log = "";
    
    this.authentication.login({
      token: this.token,
      deviceId: this.deviceId,
      email: this.loginData.username,
      password: this.loginData.password
    }).then(function (resp) {
      console.log(resp);
      this.isLoggedIn = this.authentication.isLoggedIn();
      this.navCtrl.setRoot(ListPage);
    }.bind(this), function (err) {
      console.log(err);
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
