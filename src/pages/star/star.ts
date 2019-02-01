import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, UrlSerializer } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { HTTP } from '@ionic-native/http';
import { API_URL } from '../../app/constants';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Firebase } from '@ionic-native/firebase';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
/**
 * Generated class for the StarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-star',
  templateUrl: 'star.html',
})
export class StarPage {
  star: any;
  msg = '';
  msgs = [];

  constructor(public firebaseNative: Firebase, public authentication: AuthenticationProvider, public http: HTTP, public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.star = navParams.get('star');
    this.star.picsrc = this.star ? 'img/' + this.star.pic + '.jpeg' : 'img/rob.jpeg';
    this.socket.on('message', message => {
      this.msgs.push({ content: message.content, author: message.author });
    });

    this.http.get(API_URL + 'user/' + this.authentication.currentUser().email + '/messages/' + this.star._id, {}, { Authorization: 'Bearer ' + this.authentication.getToken() }).then(data => {
      this.msgs = JSON.parse(data.data);
    }, err => {
      console.log(err);
    }).catch(err => {
      console.log(err);
    });

    
  }

  requestGreeting() {
    //this.msgs.push({ msg: this.msg, author: 'you' });
    //this.socket.emit('chat message', this.msg);
    let currentUser = this.authentication.currentUser();
    this.http.post(API_URL + 'user/' + currentUser.email + '/messages/', { user: currentUser.email, recipient: 'test@test.de', starid: this.star._id, message: this.msg, token: this.authentication.currentUser().token }, { Authorization: 'Bearer ' + this.authentication.getToken() }).then(data => {
      this.msgs.push(JSON.parse(data.data));
    }, err => {
      console.log(err);
    }).catch(err => {
      console.log(err);
    });
    this.msg = '';
  }

  ionViewDidLoad() {
  }

}
