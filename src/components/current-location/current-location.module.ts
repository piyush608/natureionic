import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CurrentLocationComponent } from './current-location';

@NgModule({
  declarations: [
      CurrentLocationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CurrentLocationComponent
  ],
})
export class CurrentLocationComponentModule {}
