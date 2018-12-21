import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { StarPage } from '../star/star';
import { ListPage } from '../list/list';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authentication: AuthenticationProvider) {
  }

  register() {
    this.authentication.register(this.user).then(data => {
      this.navCtrl.push(ListPage);
    });
  }

  toLogin = function () {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
