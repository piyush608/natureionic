import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { CurrentLocationComponentModule } from '../../components/current-location/current-location.module';

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage),
    CurrentLocationComponentModule
  ],
})
export class LocationPageModule {}
