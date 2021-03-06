import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Login } from "../login/login";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotPassword {
  userEmail: string="";

  constructor(private http:Http,private nativePageTransitions: NativePageTransitions,public navCtrl: NavController) {

  }
  login(){
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
    this.navCtrl.push(Login)
  }


  forgetPassword(){
    if(this.userEmail===""){
  alert("Enter Email")
    }
    let apiUrl = 'http://luxurri.com/luxurri_App/iOSforgotpwd.php?email='+ this.userEmail;
    
        console.log(apiUrl);
    
        this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
    
    if(data.Status=="failed"){
      alert("Invalid eamil")
    }

  });
}
}
