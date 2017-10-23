import { CallNumber } from '@ionic-native/call-number';
import { HomeScreen } from '../homescreen/homescreen';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs/Observable";
import { StoreDirectionmapPage } from '../Store-directionmap/Store-directionmap';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the StoreItemdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-store-itemdetails',
  templateUrl: 'store-itemdetails.html',
})
export class StoreItemdetailsPage {
  rating: any = 0;
  website: any;
  contact: any;
  public currentlat: any;
  public currentlng: any;
  plng: any;
  plat: any;
  gurl: any;
  googlemapurl: any;
  photopath: any;
  photo: any;
  p: any;
  photoarray: any;
  public placeaddress: any;
  public placename: any;
  public place_id: any;
  public item_id: any;
public itemdetail:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: Http,public actionSheetCtrl: ActionSheetController,private geolocation: Geolocation,public loadingCtrl: LoadingController,private storage: Storage,private callNumber: CallNumber) {
   
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude); 
      this.currentlat =resp.coords.latitude;
      this.currentlng =resp.coords.longitude;
    
      //  loading.dismiss();
     }).catch((error) => {
      //  loading.dismiss();
       console.log('Error getting location', error);
       
     });

    //  const loading = this.loadingCtrl.create({
    //   content: 'Please wait...'
    // });
    // loading.present();

    this.place_id = this.navParams.get('p_id');
    console.log(this.place_id)
    let apiUrl = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+this.place_id+"&key=AIzaSyD_HxOvY1-iyAZJzc9oVnrO10zrQGZxe3w"
    this.http.get(apiUrl).map(res => res.json()).subscribe(data => {
      console.log(apiUrl)
      console.log(data)
    this.placename = data.result.name;
    this.googlemapurl = data.result.url;
    this.placeaddress = data.result.formatted_address;
    this.photoarray = data.result.photos;
    this.plat =data.result.geometry.location.lat;
    this.plng =data.result.geometry.location.lng;
    this.contact = data.result.international_phone_number;
    this.website = data.result.website;
    this.rating = data.result.rating;
    if (this.contact == "undefined" || this.contact == null) {
      this.contact = "";
  }
  if (this.website == "undefined" || this.website == null) {
      this.website = "";
  }
    for (this.p in this.photoarray) {
    // console.log(this.photoarray[this.p].photo_reference);
    this.photo = this.photoarray[this.p].photo_reference;
  }
  if(this.photo != undefined){
    
   this.photopath ="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+this.photo+"&key=AIzaSyD_HxOvY1-iyAZJzc9oVnrO10zrQGZxe3w";
    console.log(this.photopath);
  }
  else{
    this.photopath = "img/noimagefound.png";
  }
  //  this.itemdetail= JSON.stringify(data);
  //   console.log(this.itemdetail.results);
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreItemdetailsPage');
  }
  
actionsheetmap(mapurl)
{
  this.gurl = mapurl;
  const actionSheet = this.actionSheetCtrl.create({
    title: 'Get Direction',
    buttons: [
      {
       
        text: 'Open In-App Map',
        handler: () => {
          console.log('Archive clicked');
        
          this.navCtrl.push(StoreDirectionmapPage,{placelat: this.plat, placelng: this.plng,clat: this.currentlat,clng:this.currentlng});
        }
      },
      {
        text: 'Open in Google Map ',
        
         handler: () => {
           console.log('Destructive clicked');
           console.log(this.gurl)
           window.location.href =this.gurl; 
         }
      },
      {
        text: 'Cancel',
        role: 'destructive',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

opendrive(){
  this.navCtrl.push(HomeScreen)
}
call()
{
  
  
    this.callNumber.callNumber(this.contact, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));

  
}
}
