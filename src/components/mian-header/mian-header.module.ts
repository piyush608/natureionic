import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MianHeaderComponent } from './mian-header';

@NgModule({
  declarations: [
    MianHeaderComponent
  ],
  exports: [
    MianHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class MianHeaderComponentModule {}
