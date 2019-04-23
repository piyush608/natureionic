import { ProfileImageComponentModule } from './../../components/profile-image/profile-image.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnBoardingPage } from './on-boarding';

@NgModule({
  declarations: [
    OnBoardingPage,
  ],
  imports: [
    IonicPageModule.forChild(OnBoardingPage),
    ProfileImageComponentModule
  ],
})
export class OnBoardingPageModule {}
