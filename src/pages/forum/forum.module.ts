import { ForumCommentComponentModule } from './../../components/forum-comment/forum-comment.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPage),
    ForumCommentComponentModule
  ],
})
export class ForumPageModule {}
