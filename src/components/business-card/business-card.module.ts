import { BookmarkComponentModule } from './../bookmark/bookmark.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BusinessCardComponent } from './business-card';

@NgModule({
  declarations: [
    BusinessCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookmarkComponentModule
  ],
  exports: [
    BusinessCardComponent,
  ],
})
export class BusinessCardComponentModule {}
