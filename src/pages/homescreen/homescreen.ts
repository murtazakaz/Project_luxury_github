import { StoreCategoriesPage } from '../store-categories/store-categories';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, MenuController, ModalController, LoadingController, IonicPage, AlertController, NavParams } from 'ionic-angular';
import { Login } from "../login/login";
import { SignUp } from "../signup/signup";
import { OrdercarPage } from "../ordercar/ordercar";
import { ReservecarPage } from "../reservecar/reservecar";
import { DirectionPage } from '../direction/direction';
import { DriveinfoPage } from '../driveinfo/driveinfo';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
 import { Geolocation } from '@ionic-native/geolocation';
 import { Http } from '@angular/http';
 import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'homescreen',
  templateUrl: 'homescreen.html'
})
export class HomeScreen {
  map: GoogleMap;
  mapElement: HTMLElement;

  address;
    disabled=true;
    currPostionLat: any;
    currPostionLong: any;
    currLocationName: any;
    currLocationData: any; 
    currDestName: any;
    userId: any;
    currentDate: any;
    count=0;
    
  constructor(private googleMaps: GoogleMaps, private menuCtrl: MenuController, public navParams: NavParams, private modalCtrl: ModalController, public navCtrl: NavController, private geolocation: Geolocation, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController) {
    
    this.userId = this.navParams.get('userId');

    this.address = {
      place: ''
    };

    this.currDestName = 'Where to go?';

    this.currentDate = (new Date()).toISOString();
    console.log('Date: ' + this.currentDate);

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currPostionLat = resp.coords.latitude;
      this.currPostionLong = resp.coords.longitude;

      this.loadMap();
      console.log("Lat: " + this.currPostionLat + " Long: " + this.currPostionLong);

      this.getAddressFromLatLong();

    }).catch((error) => {
      console.log(error);   
     });
  }

  getAddressFromLatLong(){
    let loader = this.loadingCtrl.create({
            content: "Getting Your Current Location..."
          });
          loader.present();
    
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ this.currPostionLat +','+ this.currPostionLong +'&key=AIzaSyDVOCdZnuNiXQkN48Wm6VVyXnqqmearRfI').map(res => res.json()).subscribe(data => {
            this.currLocationName = data.results[0].formatted_address;  
            loader.dismiss();
        });
    }

   loadMap() {
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.currPostionLat,
          lng: this.currPostionLong
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.map.setMyLocationEnabled(true);
       // this.fetchDrivers();
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe( 
          (LatLng) => {
            console.log(LatLng);
          });

          this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(
            (CameraPosition) => { 
              console.log(CameraPosition);
              //console.log("Camera Move End 2: " + CameraPosition.target.lat + " - " + CameraPosition.target.lng);
              
              this.currPostionLat = CameraPosition.target.lat;
              this.currPostionLong = CameraPosition.target.lng;

              this.getAddressFromLatLongCameraEnd(CameraPosition.target.lat, CameraPosition.target.lng);                    
            });
      });
  }

  getAddressFromLatLongCameraEnd(lat: any, longi: any) {
    
          console.log("Address Function Called...");
    
          this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat +','+ longi +'&key=AIzaSyDVOCdZnuNiXQkN48Wm6VVyXnqqmearRfI').map(res => res.json()).subscribe(data => {
            //this.currLocationName = '' + data.results[0].formatted_address;
            this.currLocationData = data.results[0].formatted_address;
            this.currLocationName = this.currLocationData;
            console.log("Address Is: " + this.currLocationName);
           
        });
      }

  
  OnOpenMenu() {
    this.menuCtrl.open();
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(DriveinfoPage);
    profileModal.present();
  }


  moveMapCameraToNewLocation(lati: any, longi: any) {
    console.log("move camera")
    this.map.animateCamera({
      target: {lat: lati, lng: longi},
      zoom: 16,
      tilt: 20,
      bearing: 140,
      duration: 2000,
      padding: 0  // default = 20px
    });
    this.getAddressFromLatLongCameraEnd(lati, longi)
   }  
   presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Please Select Destination Location from the top',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  popup(){
    const alert = this.alertCtrl.create({
      title: 'Information!',
      subTitle: 'Luxurri Ride will be available on 15<sup>th</sup> of November. Get your first Luxurri Ride Free',
      buttons: [{ text: 'Open Luxurry Store',
      handler: () => {
        this.navCtrl.setRoot(StoreCategoriesPage)
      }}]
    });
    alert.present();
  }
  //Go Now Button event
  ordercar() {

    if(this.count==0){

this.presentAlert();
    }

    else{

    
    let loader = this.loadingCtrl.create({
      content: "Ordering a car for you...."
    });
    loader.present();

    let currentDate = (new Date()).toISOString().split('T')[0];
    let currentTime = (new Date()).toISOString().split('T')[1].split('.')[0];
    console.log('Date: ' + currentDate);
    console.log('Date: ' + currentTime);

    let apiUrl = 'http://luxurri.com/luxurri_App/iOSordercar.php?userId='+ this.userId +'&orderDate='+ currentDate +'&orderLocation='+ this.currLocationName +'&orderLatitude='+ this.currPostionLat +'&orderLongitude='+ this.currPostionLong +'&orderInfrontOf=null&orderCarName=Silver&orderCarCatID=1&orderCarkm=9.0&orderTime='+ currentTime;
    
      this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
    
        loader.dismissAll();
        console.log(data);
    
        if(data.success === '1')
          {
            this.navCtrl.push(DriveinfoPage, {
              userPickUpLocation: this.currLocationName,
              userDestination: this.currDestName
            })
          } else {
            let alert = this.alertCtrl.create({
              title:'Order Response', 
              subTitle: data.message,
              buttons:['OK']
            });
            alert.present();
          }
      });
    }
  }

  ReservecarPage() {
    this.navCtrl.push(ReservecarPage,{locationName: this.currLocationName})
  }

  DirectionPage() {

   
    let profileModal = this.modalCtrl.create(DirectionPage);
    let me = this;
    profileModal.onDidDismiss(data => {
      this.address.place = data;
      console.log(data);
      this.currDestName = this.address.place;
      console.log(this.currDestName);
      if(this.currDestName != undefined){
       this.count=1;
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Information!',
          subTitle: 'Please Select Destination Location',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    });
    profileModal.present();
  }

  // fetchDrivers(){
  //   this.map.addMarker({
  //     title: 'Ionic',
  //     icon: 'blue',
  //     animation: 'DROP',
  //     position: {
  //       lat: 43.0741904,
  //       lng: -89.3809802
  //     }
  //   })
  //   .then(marker => {
  //     marker.on(GoogleMapsEvent.MARKER_CLICK)
  //       .subscribe(() => {
  //         alert('clicked');
  //       });
  //   });
  // }

  fetchDrivers(driverCat){


    let apiUrl = 'http://luxurri.com/luxurri_App/fetchDriversByCat.php?catID='+driverCat;
    this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
      for(var i in  data.data){
        this. addMarker(data.data[i].driverFullName, data.data[i].driverCurrentLat,data.data[i].driverCurrentLong)}
    console.log("data silver"+JSON.stringify(data.data[0].driverFullName))
    console.log("data silver"+JSON.stringify(data.data.driverFullName))
    
//  this. addMarker(data.data.driverFullName, data.data.driverCurrentLat,data.data.driverCurrentLong)
});  
    }


    addMarker(driverName,lat,long){
      this.map.addMarker({
        title:driverName,
        icon: 'img/marker.png',
        animation: 'DROP',
        position: {
          lat: lat,
          lng: long
        }
      })
     
   }
    

}
