import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddForumPage } from './add-forum';
import { ForumCommentComponentModule } from '../../components/forum-comment/forum-comment.module';

@NgModule({
  declarations: [
    AddForumPage,
  ],
  imports: [
    IonicPageModule.forChild(AddForumPage),
    ForumCommentComponentModule
  ],
})
export class AddForumPageModule {}
