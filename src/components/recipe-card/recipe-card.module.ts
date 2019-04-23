import { BookmarkComponentModule } from './../bookmark/bookmark.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RecipeCardComponent } from './recipe-card';

@NgModule({
  declarations: [
    RecipeCardComponent
  ],
  exports: [
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    BookmarkComponentModule
  ],
})
export class RecipeCardComponentModule {}
