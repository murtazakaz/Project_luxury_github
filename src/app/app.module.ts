
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { CallNumber } from '@ionic-native/call-number';
import { NativeStorage } from '@ionic-native/native-storage';

import { CategoriesPage } from '../pages/categories/categories';
import { StoreCategoriesPage } from '../pages/store-categories/store-categories';
import { StoreItemlistPage } from '../pages/store-itemlist/store-itemlist';
import { StoreItemdetailsPage } from '../pages/store-itemdetails/store-itemdetails';
import { StoreDirectionmapPage } from '../pages/Store-directionmap/Store-directionmap';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { DriveinfoPage } from '../pages/driveinfo/driveinfo';
import { ReservededitPage } from '../pages/reservededit/reservededit';
import { MytripsPage } from '../pages/mytrips/mytrips';
import { DirectionPage } from '../pages/direction/direction';
import { ContactusPage } from '../pages/contactus/contactus';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { WalletPage } from '../pages/wallet/wallet';
import { ReservecarPage } from '../pages/reservecar/reservecar';
import { OrdercarPage } from '../pages/ordercar/ordercar';
import { HomeScreen } from '../pages/homescreen/homescreen';
import { ForgotPassword } from '../pages/forgotpassword/forgotpassword';
import { SignUp } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import {AutocompletePage} from '../pages/autocomplete/autocomplete';

@NgModule({ 
  declarations: [
    MyApp,
    CategoriesPage,
    StoreCategoriesPage,
    StoreItemlistPage,
    StoreItemdetailsPage,
    AutocompletePage,
    StoreDirectionmapPage,
    Login,
    SignUp,
    ForgotPassword,
    HomeScreen,
    OrdercarPage,
    ReservecarPage,
    WalletPage,
    AboutusPage,
    ContactusPage,
    CategoriesPage,
    DirectionPage,
    MytripsPage,
    ReservededitPage,
    DriveinfoPage,
    ChangepasswordPage
  
  ],
  imports: [
    BrowserModule,
    HttpModule , 
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoriesPage,
    StoreCategoriesPage,
    StoreItemlistPage,
    StoreItemdetailsPage,
    AutocompletePage,
    StoreDirectionmapPage,
    Login,
    SignUp,
    ForgotPassword,
    HomeScreen,
    OrdercarPage,
    ReservecarPage,
    WalletPage,
    AboutusPage,
    ContactusPage,
    CategoriesPage,
    DirectionPage,
    MytripsPage,
    ReservededitPage,
    DriveinfoPage,
    ChangepasswordPage
    
  ],
  providers: [
    StatusBar,  
    SplashScreen,
    GoogleMaps,
    HttpModule, 
    Geolocation,
    NativePageTransitions,
    NativeStorage ,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}) 
export class AppModule {}
