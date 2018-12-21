import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.star = navParams.get('star');
    this.star.picsrc = this.star ? 'img/' + this.star.pic + '.jpeg' : 'img/rob.jpeg';
    this.socket.on('answer', answer => {
      this.msgs.push({ msg: answer, author: this.star.name})
    });
  }

  requestGreeting() {
    this.msgs.push({ msg: this.msg, author: 'you' });
    this.socket.emit('chat message', this.msg);
    
    this.msg = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StarPage');
  }

}
