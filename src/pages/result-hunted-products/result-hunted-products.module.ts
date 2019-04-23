import { HuntedProductCategoryPipeModule } from './../../pipes/hunted-product-category/hunted-product-category.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultHuntedProductsPage } from './result-hunted-products';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module';
import { SearchbarComponentModule } from '../../components/searchbar/searchbar.module';

@NgModule({
  declarations: [
    ResultHuntedProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultHuntedProductsPage),
    ProductCardComponentModule,
    SearchbarComponentModule,
    HuntedProductCategoryPipeModule
  ],
})
export class ResultHuntedProductsPageModule {}
