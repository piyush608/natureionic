import { SearchbarComponentModule } from './../../components/searchbar/searchbar.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { CurrentLocationComponentModule } from '../../components/current-location/current-location.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    SearchbarComponentModule,
    CurrentLocationComponentModule
  ],
})
export class SearchPageModule {}
