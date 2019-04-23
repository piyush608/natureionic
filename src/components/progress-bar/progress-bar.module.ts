import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressBarComponent } from './progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class ProgressBarComponentModule {}
