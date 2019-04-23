import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionsPage } from './discussions';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';
import { ForumCardComponentModule } from '../../components/forum-card/forum-card.module';

@NgModule({
  declarations: [
    DiscussionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionsPage),
    MianHeaderComponentModule,
    ForumCardComponentModule
  ],
})
export class DiscussionsPageModule {}
