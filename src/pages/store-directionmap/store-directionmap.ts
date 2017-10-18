import { Component } from '@angular/core';
import { NavController,NavParams ,LoadingController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
// Added
/**
 * Generated class for the StoreDirectionmapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-store-directionmap',
  templateUrl: 'store-directionmap.html',
})
export class StoreDirectionmapPage {
  Destination: any = '';
  MyLocation: any;
  placelatitude : any;
  placelongitude: any;
  currentlat:any;
  currentlng : any;
  constructor(public navCtrl: NavController,private geolocation: Geolocation,  public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.placelatitude = this.navParams.get('placelat');
    this.placelongitude = this.navParams.get('placelng');
    this.currentlat = this.navParams.get('clat');
    this.currentlng = this.navParams.get('clng');
    console.log(this.placelatitude , this.placelongitude );
    // this.Destination = new google.maps.LatLng(this.placelatitude,this.placelongitude);
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude); 
    //   this.currentlat =resp.coords.latitude;
    //   this.currentlng =resp.coords.longitude;
    
    //   loading.dismiss();
    //  }).catch((error) => {
    //   loading.dismiss();
    //    console.log('Error getting location', error);
    //  });

    
    //   const loading = this.loadingCtrl.create({
    //     content: 'Fetching your current location...'
    //   });
    //   loading.present();
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad StoreItemlistPage');
    this.calculateAndDisplayRoute();
    }
 
 calculateAndDisplayRoute() {
  // let that = this;
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: this.placelatitude ,lng: this.placelongitude}
  });
  directionsDisplay.setMap(map);

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //     map.setCenter(pos);
  //     that.MyLocation = new google.maps.LatLng(pos);
  //     console.log(that.MyLocation)
  //   }, function() {

  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  // }

  directionsService.route({
  origin: {lat: this.currentlat ,lng: this.currentlng},
  destination: {lat: this.placelatitude ,lng: this.placelongitude},
  travelMode: 'DRIVING'
}, function(response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
});
}


}