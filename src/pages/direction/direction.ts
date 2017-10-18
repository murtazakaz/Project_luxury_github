import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeTransitionOptions, NativePageTransitions } from '@ionic-native/native-page-transitions';
declare var google;

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();

  constructor(private nativePageTransitions: NativePageTransitions,public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams, private zone: NgZone) {

    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionPage');
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'PK'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }
}
