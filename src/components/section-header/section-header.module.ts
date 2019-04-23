import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SectionHeaderComponent } from './section-header';

@NgModule({
  declarations: [
    SectionHeaderComponent
  ],
  exports: [
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class SectionHeaderComponentModule {}
