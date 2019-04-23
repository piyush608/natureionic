import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionProductPage } from './collection-product';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module';
import { HuntedProductCategoryPipeModule } from '../../pipes/hunted-product-category/hunted-product-category.module';

@NgModule({
  declarations: [
    CollectionProductPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionProductPage),
    ProductCardComponentModule,
    HuntedProductCategoryPipeModule,
    MianHeaderComponentModule
  ],
})
export class CollectionProductPageModule {}
