import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LevelCardComponent } from './level-card';

@NgModule({
  declarations: [
    LevelCardComponent
  ],
  exports: [
    LevelCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class LevelCardComponentModule {}
