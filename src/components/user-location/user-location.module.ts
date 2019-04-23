import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserLocationComponent } from './user-location';

@NgModule({
  declarations: [
    UserLocationComponent
  ],
  exports: [
    UserLocationComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class UserLocationComponentModule {}
