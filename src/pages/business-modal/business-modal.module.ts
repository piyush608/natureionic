import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessModalPage } from './business-modal';

@NgModule({
  declarations: [
    BusinessModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BusinessModalPage),
  ],
})
export class BusinessModalPageModule {}
