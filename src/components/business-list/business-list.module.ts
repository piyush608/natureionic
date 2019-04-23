import { BusinessListComponent } from './business-list';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
      BusinessListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    BusinessListComponent
  ],
})
export class BusinessListComponentModule {}
