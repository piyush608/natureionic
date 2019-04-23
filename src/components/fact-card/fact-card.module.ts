import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FactCardComponent } from './fact-card';
import { BookmarkComponentModule } from '../bookmark/bookmark.module';

@NgModule({
  declarations: [
    FactCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookmarkComponentModule
  ],
  exports: [
    FactCardComponent,
  ],
})
export class FactCardComponentModule {}
