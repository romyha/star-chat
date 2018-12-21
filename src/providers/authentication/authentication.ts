import { Injectable } from '@angular/core';
import * as Constants from '../../app/constants'; 
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HTTP) {
  }

  saveToken = function (token) {
    localStorage.setItem('inventory-token', token);
  };

  getToken = function () {
    return localStorage.getItem('inventory-token');
  };

  isLoggedIn = function () {
    let token = this.getToken();
    return token ? true : false;
  }

  currentUser = function () {
    if (this.isLoggedIn()) {
      let token = this.getToken();
      let payload = JSON.parse(window.atob(token.split('.')[1]));
      return {
        email: payload.email,
        name: payload.name
      };
    }
  };

  register = function (user) {
    return this.http.post(Constants.API_URL + 'register', user, {}).then(function (response) {
      this.saveToken(JSON.parse(response.data).token);
    }.bind(this), httpError => {
      console.log('failed: ', httpError);
    }).catch(error => {
      console.log(error);
    });
  };

  login = function (user) {
    return this.http.post(Constants.API_URL + "login", user, {}).then(function (response) {
      this.saveToken(JSON.parse(response.data).token);
    }.bind(this));
  };

  logout = function () {
    localStorage.removeItem('inventory-token');
  }
}
