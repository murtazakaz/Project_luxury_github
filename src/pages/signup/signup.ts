import { Login } from './../login/login';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'signup',
  templateUrl: 'signup.html'
})
export class SignUp {

  name: String = '';
  email: String = '';
  mobileNumber: String = '';
  password: String = '';
  firebaseID: String = 'AIzASzxcmnbvkajsdhfasdhfambnsdfkghasdfbnd';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http) {
    
      }

      signup()
      {
        if(this.name === '' || this.email === '' || this.mobileNumber === '' || this.password === '') {
          let alert = this.alertCtrl.create({
            title:'Login Error', 
            subTitle:'All fields are rquired!',
            buttons:['OK']
          });
          alert.present();
          return;
        }
    
        let loader = this.loadingCtrl.create({
          content: "Signing Up.."
        });
        loader.present();
        
        let apiUrl = 'http://luxurri.com/luxurri_App/iOSsignup.php?name='+ this.name +'&email='+ this.email + '&password=' + this.password + '&mobile=' + this.mobileNumber;
    
        this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
    
          console.log(apiUrl);
          loader.dismissAll();
          console.log(data);
    
          if(data.success === '1')
            {
              let alert = this.alertCtrl.create({
                title:'User Registration', 
                subTitle: data.message,
                buttons:['OK']
              });
              alert.present();
              this.navCtrl.push(Login);
            } else {
              let alert = this.alertCtrl.create({
                title:'Registration Error', 
                subTitle: data.message,
                buttons:['OK']
              });
              alert.present();
    
            }
    
        });
    
    
      }
}
