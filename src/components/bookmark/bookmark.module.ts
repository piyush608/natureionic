import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BookmarkComponent } from './bookmark';

@NgModule({
  declarations: [
      BookmarkComponent
  ],
  exports: [
    BookmarkComponent,
  ],
  imports: [
    IonicModule,
  ],
})
export class BookmarkComponentModule {}
