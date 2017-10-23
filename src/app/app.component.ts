import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { MytripsPage } from '../pages/mytrips/mytrips';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { WalletPage } from '../pages/wallet/wallet';
import { HomeScreen } from '../pages/homescreen/homescreen';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, ViewController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CategoriesPage } from '../pages/categories/categories';
import { StoreCategoriesPage } from '../pages/store-categories/store-categories';
import { StoreItemlistPage } from '../pages/store-itemlist/store-itemlist';
import { StoreItemdetailsPage } from '../pages/store-itemdetails/store-itemdetails';
import {AutocompletePage} from '../pages/autocomplete/autocomplete';
import { StoreDirectionmapPage } from '../pages/Store-directionmap/Store-directionmap';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =HomeScreen;
  homepage=HomeScreen;
  logout=CategoriesPage;
  wallet=WalletPage;
  aboutus=AboutusPage;
  mytrips=MytripsPage;
  changepassword=ChangepasswordPage;
  storehomepage = StoreCategoriesPage;
  
//contactus=ContactusPage;
  @ViewChild('nav') nav: NavController;
  // @ViewChild('navStore') navStore: NavController;
  @ViewChild('View') viewCtrl: ViewController;
  constructor(private modalCtrl:ModalController, private menuCtrl:MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
  store(){
    this.nav.setRoot(StoreCategoriesPage);
  }
  pageload(page:any){
    this.nav.push(page);
    this.menuCtrl.close();
  }

  // pageload2(page:any){
  //   this.navStore.push(page);
  //   this.menuCtrl.close();
  // }
  OnLoad(page: any)
  {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
}

