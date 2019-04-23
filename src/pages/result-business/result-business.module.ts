import { SearchbarComponentModule } from './../../components/searchbar/searchbar.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultBusinessPage } from './result-business';
import { BusinessCardComponentModule } from '../../components/business-card/business-card.module';
import { CurrentLocationComponentModule } from '../../components/current-location/current-location.module';

@NgModule({
  declarations: [
    ResultBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultBusinessPage),
    BusinessCardComponentModule,
    SearchbarComponentModule,
    CurrentLocationComponentModule
  ],
})
export class ResultBusinessPageModule {}
