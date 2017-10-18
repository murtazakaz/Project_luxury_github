import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Login } from '../login/login';
import { StoreCategoriesPage } from '../store-categories/store-categories';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { 
   trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';
/**
 * Generated class for the CategoriesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor( private menu: MenuController,private nativePageTransitions: NativePageTransitions,public navCtrl: NavController, public navParams: NavParams) {
    this.menu.swipeEnable(false);
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
  
  splash = true;
  ionViewDidEnter() { 
    //  this.tabBarElement.style.display = 'none';  (If not using Tab menu)
    setTimeout(() => {
      this.splash = false;
      //    this.tabBarElement.style.display = 'flex';  (If not using Tab menu)
    }, 4000);
  }
  openstore(){

    this.navCtrl.push(StoreCategoriesPage);
  }
}
