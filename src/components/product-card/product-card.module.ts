import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductCardComponent } from './product-card';
import { BookmarkComponentModule } from './../bookmark/bookmark.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookmarkComponentModule
  ],
  exports: [
    ProductCardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProductCardComponentModule {}
