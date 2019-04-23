import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserCardComponent } from './user-card';

@NgModule({
  declarations: [
    UserCardComponent
  ],
  exports: [
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class UserCardComponentModule {}
