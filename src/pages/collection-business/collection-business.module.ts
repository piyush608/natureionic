import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionBusinessPage } from './collection-business';
import { BusinessCardComponentModule } from '../../components/business-card/business-card.module';
import { BusinessCategoryPipeModule } from '../../pipes/business-category/business-category.module';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';

@NgModule({
  declarations: [
    CollectionBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionBusinessPage),
    BusinessCardComponentModule,
    BusinessCategoryPipeModule,
    MianHeaderComponentModule
  ],
})
export class CollectionBusinessPageModule {}
