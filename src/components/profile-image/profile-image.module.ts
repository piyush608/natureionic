import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { ProfileImageComponent } from './profile-image';

@NgModule({
  declarations: [
    ProfileImageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ProfileImageComponent
  ]
})
export class ProfileImageComponentModule {}
