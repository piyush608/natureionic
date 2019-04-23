import { CurrentLocationComponentModule } from './../../components/current-location/current-location.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreBusinessPage } from './explore-business';
import { SearchbarComponentModule } from '../../components/searchbar/searchbar.module';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';
import { BusinessCategoryCardComponentModule } from '../../components/business-category-card/business-category-card.module';

@NgModule({
  declarations: [
    ExploreBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreBusinessPage),
    SearchbarComponentModule,
    BusinessCategoryCardComponentModule,
    CurrentLocationComponentModule,
    SectionHeaderComponentModule
  ]
})
export class ExploreBusinessPageModule {}
