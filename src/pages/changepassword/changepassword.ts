import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  cpwd:string="";
  npwd:string="";
  confirmpwd:string=""
  constructor( public http: Http,public navCtrl: NavController, public navParams: NavParams) {
  }


  ChangepasswordPage(){

    if(this.npwd===''|| this.confirmpwd===''){
        alert("Password cannot be empty")      
    }
    else if(this.npwd != this.confirmpwd){
      alert("Password didnot match")      
    }

    else{
    this.http.get('http://luxurri.com/luxurri_App/iOSforgotpwd.php?currentPwd='+ this.cpwd +'&newPwd='+ this.npwd).map(res => res.json()).subscribe(data => {
    console.log("change pwd"+data)

    if(this.cpwd===data.userPassword){
      this.http.get('http://luxurri.com/luxurri_App/iOSforgotpwd.php?currentPwd='+ this.cpwd +'&newPwd='+ this.npwd).map(res => res.json()).subscribe(data => {
      console.log(""+data)
      alert("Password Changed Successfully")
    });
    }
    else{
      alert("Incorrect Current Password")
    }
  });
}
  }
 
}


