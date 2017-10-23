import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ReservecarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-reservecar',
  templateUrl: 'reservecar.html',
})
export class ReservecarPage {
  locationName: any;
  userId: any;
pickup:string="";
startTime:string="";
date:string;
driveCat:string;
description:string="";
  constructor(private loadingCtrl:LoadingController, private nativeStorage: NativeStorage,private http:Http, public navCtrl: NavController, public navParams: NavParams) {
    this.locationName =  this.navParams.get('locationName')
    this.nativeStorage.getItem('UserDetails')
    .then(
      data => this.userId=data.userId,
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservecarPage');
  }


  Reservecar(){
if(this.pickup===''||this.startTime===''||this.date===''||this.driveCat===''){
alert("Enter all Fields")
}

else{
  let loader = this.loadingCtrl.create({
    content: "Reserving..."
  });
  loader.present();
  
  let apiUrl = 'http://luxurri.com/luxurri_App/iOSreservecar.php?userId='+ this.userId +'&pickupAddress='+ this.pickup + '&description=' + this.description + '&time=' + this.startTime+'&date='+ this.date + '&driveCat='+this.driveCat;
  
      this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
        loader.dismissAll();
        console.log(apiUrl);
        console.log(data);
        alert("Your ride is reserved");
      });
}
  }
}
