import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import * as Constants from '../../app/constants';
import { AuthenticationProvider } from '../../providers/authentication/authentication'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  characters: string[];

  stars: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, public authentication: AuthenticationProvider) {
    this.http.get(Constants.API_URL + 'stars', {}, { Authorization: 'Bearer ' + this.authentication.getToken() }).then(data => {
      this.stars = JSON.parse(data.data);
      this.stars.forEach(star => {
        star.picsrc = 'img/' + star.pic + '.jpeg';
      })
    }, err => {
      console.log(err);
    }).catch(err => {
      console.log(err);
    });
  }

  itemTapped(event, star) {
    this.navCtrl.push('StarPage', {
      star: star
    });
  }
}