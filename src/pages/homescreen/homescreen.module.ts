import { NgModule } from '@angular/core';
import { HomeScreen} from './homescreen';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [HomeScreen],
  imports: [IonicPageModule.forChild(HomeScreen)],
  entryComponents: [HomeScreen]
})
export class HomeScreenModule { }
