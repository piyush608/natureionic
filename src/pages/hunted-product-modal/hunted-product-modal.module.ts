import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HuntedProductModalPage } from './hunted-product-modal';

@NgModule({
  declarations: [
    HuntedProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HuntedProductModalPage),
  ],
})
export class HuntedProductModalPageModule {}
