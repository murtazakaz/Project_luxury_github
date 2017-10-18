import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReservededitPage } from '../reservededit/reservededit';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-mytrips',
  templateUrl: 'mytrips.html',
})
export class MytripsPage {
trips:string='past'

tripsData: any;

  constructor(private nativePageTransitions: NativePageTransitions,public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    this.http.get('http://luxurri.com/luxurri_App/iOSUserTripHistory.php?userId=13').map(res => res.json()).subscribe(data => {
    console.log(data);
    console.log(data.data);
    this.tripsData = data.data;
      
  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MytripsPage');
  }
  ReservededitPage(){
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
    this.navCtrl.push(ReservededitPage)

    
  }
}
