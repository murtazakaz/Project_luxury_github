import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the OrdercarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-ordercar',
  templateUrl: 'ordercar.html',
})
export class OrdercarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  // orderdetails(){
  //   this.navCtrl.push(OrderdetailsPage)
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdercarPage');
  }

}
