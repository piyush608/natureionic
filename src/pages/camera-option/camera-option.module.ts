import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraOptionPage } from './camera-option';

@NgModule({
  declarations: [
    CameraOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraOptionPage),
  ],
})
export class CameraOptionPageModule {}
