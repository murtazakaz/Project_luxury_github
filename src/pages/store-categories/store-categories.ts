
import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import { StoreItemlistPage } from '../store-itemlist/store-itemlist';
/**
 * Generated class for the StoreCategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-store-categories',
  templateUrl: 'store-categories.html',
})
export class StoreCategoriesPage {
  category : any;
  constructor(private menuCtrl:MenuController ,public navCtrl: NavController, public navParams: NavParams) {
  }

//   openMenu(evt) {
//     console.log(evt)
//     if(evt === "main"){
//        this.menuCtrl.enable(true, 'menu2');
//        this.menuCtrl.enable(false, 'menu1');
//     }else{
//        this.menuCtrl.enable(true, 'menu1');
//        this.menuCtrl.enable(false, 'menu2');
//     }
//     this.menuCtrl.toggle();
// }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreCategoriesPage');
  }
  itemlist(cat){
   this.category=cat;

    this.navCtrl.push(StoreItemlistPage,{cat: this.category});}
}
