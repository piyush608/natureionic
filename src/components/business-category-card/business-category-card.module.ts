import { SectionHeaderComponentModule } from './../section-header/section-header.module';
import { BusinessCardComponentModule } from './../business-card/business-card.module';
import { BookmarkComponentModule } from './../bookmark/bookmark.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BusinessCategoryCardComponent } from './business-category-card';

@NgModule({
  declarations: [
    BusinessCategoryCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookmarkComponentModule,
    BusinessCardComponentModule,
    SectionHeaderComponentModule
  ],
  exports: [
    BusinessCategoryCardComponent,
  ],
})
export class BusinessCategoryCardComponentModule {}
