import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForumCommentComponent } from './forum-comment';

@NgModule({
  declarations: [
    ForumCommentComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ForumCommentComponent,
  ],
})
export class ForumCommentComponentModule {}
