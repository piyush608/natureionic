import { SectionHeaderComponentModule } from './../../components/section-header/section-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreProductsPage } from './explore-products';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module'
import { HuntedProductCategoryPipeModule } from '../../pipes/hunted-product-category/hunted-product-category.module';

@NgModule({
  declarations: [
    ExploreProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreProductsPage),
    ProductCardComponentModule,
    HuntedProductCategoryPipeModule,
    SectionHeaderComponentModule
  ],
})
export class ExploreProductsPageModule {}
