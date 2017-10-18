import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the WalletPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  constructor(private alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  alert(){
    let alert = this.alertCtrl.create({
      title: 'Wallet Topup <br>',
      subTitle:'',
      inputs: [
        {
          name: 'username',
          placeholder: 'Wallet Topup Amount'
          
        },
       
      ],
      
      buttons: [
        {
          text: 'Topup',
          cssClass:'btnclass',
       //   role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
     ]
    });
    alert.setCssClass('alertCustomCss');
    alert.present();
  }
}
