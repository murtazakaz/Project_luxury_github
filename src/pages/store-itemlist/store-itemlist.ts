import { Http } from '@angular/http';
//import { HTTP } from '@ionic-native/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import { StoreItemdetailsPage } from '../store-itemdetails/store-itemdetails';
import { LoadingController } from 'ionic-angular';
import {ModalController} from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete';
import { Geolocation } from '@ionic-native/geolocation';
import { StoreDirectionmapPage } from '../Store-directionmap/Store-directionmap';

declare var google;
/**
 * Generated class for the StoreItemlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-store-itemlist',
  templateUrl: 'store-itemlist.html',
})
export class StoreItemlistPage {
  keywords: string;
  placelng: any;
  placelat: any;
  nearbyitemarray: any;
  currentlng: number;
  currentlat: number;
  convertaddress: any;
  longitude: any;
  latitude: any;
  public val: any;
  public searchQuery: any;
  public itemarray: any;
 public itemcategory:any;
 public itemid:any;
 public nearby:string = 'nearby';
 public address:any;
 public displayresult: any;
 public desiredtab:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,public loadingCtrl: LoadingController, private ModalCtrl:ModalController,private geolocation: Geolocation) {
    this.itemcategory = this.navParams.get('cat');
    console.log(this.itemcategory);
    if (this.itemcategory == "amusement_park") {
      
      this.keywords = "park";
  }
  if (this.itemcategory == "bank") {
    
    this.keywords = "bank";
}
if (this.itemcategory == "beauty_salon") {
  
  this.keywords = "beauty";
}
if (this.itemcategory == "cafe") {
  
  this.keywords = "cafe";
}
if (this.itemcategory == "clothing_store") {
  
  this.keywords = "Clothing";
}
if (this.itemcategory == "dentist") {
  
  this.keywords = "dentist";
}
if (this.itemcategory == "doctor") {
  
  this.keywords = "clinic";
}
if (this.itemcategory == "gas_station") {
  
  this.keywords = "gas";
}
if (this.itemcategory == "gym") {
  
  this.keywords = "gym";
}
if (this.itemcategory == "hair_care") {
  
  this.keywords = "hair";
}
if (this.itemcategory == "hospital") {
  
  this.keywords = "hospital";
}
if (this.itemcategory == "insurance_agency") {
  
  this.keywords = "insurance";
}
if (this.itemcategory == "laundry") {
  
  this.keywords = "dryclean";
}
if (this.itemcategory == "mosque") {
  
  this.keywords = "masjid";
}
if (this.itemcategory == "movie_theater") {
  
  this.keywords = "movie";
}
if (this.itemcategory == "amusement_park") {
  
  this.keywords = "park";
}
if (this.itemcategory == "amusement_park") {
  
  this.keywords = "park";
}
if (this.itemcategory == "museum") {
  
  this.keywords = "museum";
}
if (this.itemcategory == "pharmacy") {
  
  this.keywords = "Pharmacies";
}
if (this.itemcategory == "restaurant") {
  
  this.keywords = "food";
}
if (this.itemcategory == "shoe_store") {
  
  this.keywords = "shoe";
}
if (this.itemcategory == "shopping_mall") {
  
  this.keywords = "mall";
}

if (this.itemcategory == "university") {
  
  this.keywords = "university";
}



    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude); 
      this.currentlat =resp.coords.latitude;
      this.currentlng =resp.coords.longitude;
      let apiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.currentlat+","+this.currentlng+"&radius=5000&type="+this.itemcategory+"&keyword="+this.keywords+"&key=AIzaSyD_HxOvY1-iyAZJzc9oVnrO10zrQGZxe3w";
      
      this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
           console.log(apiUrl);
          // console.log(JSON.stringify(data));
          loading.dismiss();
        if(data.results.length != 0){
			this.displayresult = data.results.length+ " Nearby places found" ;
		this.nearbyitemarray = data.results;
		}
		else {
			this.displayresult = "No places found nearby you";
			this.desiredtab = "Search here";
		}
        // console.log(this.itemarray);
         console.log( this.nearbyitemarray);
          });
  

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();


      
  //     let apirurl= 'http://govirtualstore.com/app/iOS/fetchcategories.php?type='+this.itemcategory;
  // this.http.get("http://govirtualstore.com/app/iOS/fetchcategories.php?type="+this.itemcategory).map(res => res.json()).subscribe(data => {
  //   console.log(data);
  //  loading.dismiss();
  // this.itemarray = data;
  //  });
    

        this.address = {
          place: ''
        };

  }
  itemdetails(place_id)
  { this.itemid=place_id;
    console.log(this.itemid);
     this.navCtrl.push(StoreItemdetailsPage,{p_id: this.itemid});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreItemlistPage');
   
  }
  getItems(ev: any) {
    // Reset items back to all of the items
   

    // set val to the value of the searchbar
    let val = ev.target.value;
   console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
    }
  }

  showAddressModal () {
    let modal = this.ModalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      this.convertaddress = data;
      if(this.convertaddress != null && this.convertaddress != ""){
      this.geoCode(this.convertaddress);}
      console.log(this.address.place);
    });
    modal.present();
  }

  geoCode(convertaddress) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address':this.convertaddress }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();
    console.log("lat: " + this.latitude + ", long: " + this.longitude);
    
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let apiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.latitude+","+this.longitude+"&radius=1000&type="+this.itemcategory+"&keyword="+this.keywords+"&key=AIzaSyD_HxOvY1-iyAZJzc9oVnrO10zrQGZxe3w";
    // let api = "http://govirtualstore.com/app/iOS/googleplacescurl.php";

    // console.log(api);
    this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
        // console.log(data);
        // console.log(JSON.stringify(data));
        loading.dismiss();
      this.itemarray = data.results;
      // console.log(this.itemarray);
      // console.log( this.itemarray);
        });
   });
 }

 getDirections(plat,plng)
 { 
   this.placelat = plat;
   this.placelng = plng;
   
   console.log("function ", this.placelat ," " , this.placelng)
  this.navCtrl.push(StoreDirectionmapPage,{placelat: this.placelat,placelng: this.placelng,clat: this.currentlat,clng:this.currentlng});

 }

 getnearbyplace(){
	 
	 this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude); 
      this.currentlat =resp.coords.latitude;
      this.currentlng =resp.coords.longitude;
      let apiUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+this.currentlat+","+this.currentlng+"&radius=5000&type="+this.itemcategory+"&keyword="+this.keywords+"&key=AIzaSyD_HxOvY1-iyAZJzc9oVnrO10zrQGZxe3w";
      
      this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
           console.log(apiUrl);
          // console.log(JSON.stringify(data));
          loading.dismiss();
        if(data.results.length != 0){
			this.displayresult = data.results.length+ " Nearby places found" ;
		this.nearbyitemarray = data.results;
		}
		else {
			this.displayresult = "No places found nearby you";
			this.desiredtab = "Click Search location";
		}
        console.log(data.results.length);
		
         console.log( this.nearbyitemarray);
          });
  

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
      const loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
	 
 }
selectdesiredtab(){
	
 this.nearby = 'desired';
}
 
 
}