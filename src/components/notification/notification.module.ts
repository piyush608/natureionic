import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NotificationComponent } from './notification';
import { ProfileImageComponentModule } from '../profile-image/profile-image.module';

@NgModule({
  declarations: [
    NotificationComponent
  ],
  exports: [
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfileImageComponentModule
  ],
})
export class NotificationComponentModule {}
