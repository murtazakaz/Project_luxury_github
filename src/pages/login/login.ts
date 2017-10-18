import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SignUp } from "../signup/signup";
import { ForgotPassword } from "../forgotpassword/forgotpassword";
import { HomeScreen } from "../homescreen/homescreen";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {

  userEmail: String = '';
  userPassword: String = '';
  userData: any;

  constructor(private nativePageTransitions: NativePageTransitions,public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage) {

    let currentDate = (new Date()).toISOString().split('T')[0];
    let currentTime = (new Date()).toISOString().split('T')[1].split('.')[0];
    console.log('Date: ' + currentDate);
    console.log('Date: ' + currentTime);

  }
  signup(){
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
      this.navCtrl.push(SignUp)
  }
  forgotpwd(){
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
    this.navCtrl.push(ForgotPassword)
    
  }
  signin(){
   

     if(this.userEmail === '' || this.userPassword === '') {
      let alert = this.alertCtrl.create({
        title:'Login Error', 
        subTitle:'All fields are rquired!',
        buttons:['OK']
      });
      alert.present();
      return;
    }

    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();
    
    let apiUrl = 'http://luxurri.com/luxurri_App/iOSlogin.php?email='+ this.userEmail +'&password='+ this.userPassword;

    console.log(apiUrl);

    this.http.get(apiUrl).map(res => res.json()).subscribe(data => {

      loader.dismissAll();

      if(data.success === '1')
      {
        console.log(data.data);
        this.userData = data.data;

        this.nativeStorage.setItem('UserDetails', {userId: this.userData.userId, userName: this.userData.userFullName, userEmail: this.userData.userEmail, userMobile: this.userData.userMobile, userImage: this.userData.image, userWalletBalance: this.userData.WalletBalance })
        .then(
          () => console.log('Stored User Details!!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.getItem('UserDetails')
        .then(
          data => this.gotoHomescreen(data.userId),
          error => console.error(error)
        );
      } else {
        let alert = this.alertCtrl.create({
          title:'Login Response', 
          subTitle:'Invalid Email OR Password',
          buttons:['OK']
        });
        alert.present();
      }
  });
}

  gotoHomescreen(userID: any){
    console.log("User ID: " + userID);

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
     this.navCtrl.push(HomeScreen, {
      userId: userID
      //,userPlayerID: this.userPlayerID
    });

    // this.navCtrl.push(HomeScreen, {
    //   userId: userID,
    //   userPlayerID: this.userPlayerID
    // });
  }

}
