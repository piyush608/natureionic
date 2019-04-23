import { SearchForumCardComponentModule } from './../../components/search-forum-card/search-forum-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspirationPage } from './inspiration';
import { ForumCardComponentModule } from '../../components/forum-card/forum-card.module';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';
import { SearchbarComponentModule } from '../../components/searchbar/searchbar.module';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    InspirationPage,
  ],
  imports: [
    IonicPageModule.forChild(InspirationPage),
    ForumCardComponentModule,
    MianHeaderComponentModule,
    SearchbarComponentModule,
    SectionHeaderComponentModule,
    SearchForumCardComponentModule
  ],
})
export class InspirationPageModule {}
