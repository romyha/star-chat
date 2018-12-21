import { Component, Input } from '@angular/core';
import { AuthenticationProvider } from '../../providers/authentication/authentication'
import { LoginPage } from '../../pages/login/login';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the NavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nav',
  templateUrl: 'nav.html'
})
export class NavComponent {
  @Input() title: string;

  constructor(public authentication: AuthenticationProvider, public navCtrl: NavController) {
  }

  logout() {
    this.authentication.logout();
    this.navCtrl.push(LoginPage);
  }

}
