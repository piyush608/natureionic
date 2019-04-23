import { SearchbarComponent } from './searchbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SearchbarComponent
  ],
  exports: [
    SearchbarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class SearchbarComponentModule {}
