import { SectionHeaderComponentModule } from './../../components/section-header/section-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingPage } from './following';
import { UserCardComponentModule } from '../../components/user-card/user-card.module';

@NgModule({
  declarations: [
    FollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowingPage),
    UserCardComponentModule,
    SectionHeaderComponentModule
  ],
})
export class FollowingPageModule {}
