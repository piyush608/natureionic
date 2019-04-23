import { ForumCardComponentModule } from './../forum-card/forum-card.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchForumCardComponent } from './search-forum-card';

@NgModule({
  declarations: [
    SearchForumCardComponent
  ],
  exports: [
    SearchForumCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ForumCardComponentModule
  ],
})
export class SearchForumCardComponentModule {}
