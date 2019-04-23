import { MianHeaderComponentModule } from './../../components/mian-header/mian-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationPage } from './notification';
import { NotificationComponentModule } from '../../components/notification/notification.module';

@NgModule({
  declarations: [
    NotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationPage),
    MianHeaderComponentModule,
    NotificationComponentModule
  ],
})
export class NotificationPageModule {}
