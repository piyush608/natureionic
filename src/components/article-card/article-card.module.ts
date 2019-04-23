import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ArticleCardComponent } from './article-card';
import { BookmarkComponentModule } from '../bookmark/bookmark.module';

@NgModule({
  declarations: [
    ArticleCardComponent
  ],
  exports: [
    ArticleCardComponent,
  ],
  imports: [
    IonicModule,
    BookmarkComponentModule
  ],
})
export class ArticleCardComponentModule {}
