import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-driveinfo',
  templateUrl: 'driveinfo.html',
})
export class DriveinfoPage {

  userPickupLocation: any;
  userDestination: any;

  constructor(private callNumber: CallNumber,private nativePageTransitions: NativePageTransitions,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams) {

    this.userPickupLocation = this.navParams.get('userPickUpLocation');
    this.userDestination = this.navParams.get('userDestination');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriveinfoPage');
  }
//   goNow(){
// this.navCtrl.push(ThankyouPage)
//   }

  CallNumber(){
    this.callNumber.callNumber("03322351256", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  dismiss() {
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
     };
     this.nativePageTransitions.slide(options);
     this.viewCtrl.dismiss();
   }
}
