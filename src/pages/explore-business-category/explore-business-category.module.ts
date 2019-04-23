import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreBusinessCategoryPage } from './explore-business-category';
import { BusinessCardComponentModule } from '../../components/business-card/business-card.module';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    ExploreBusinessCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreBusinessCategoryPage),
    BusinessCardComponentModule,
    SectionHeaderComponentModule
  ],
})
export class ExploreBusinessCategoryPageModule {}
