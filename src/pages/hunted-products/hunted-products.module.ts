import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HuntedProductsPage } from './hunted-products';

@NgModule({
  declarations: [
    HuntedProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(HuntedProductsPage),
  ],
})
export class HuntedProductsPageModule {}
