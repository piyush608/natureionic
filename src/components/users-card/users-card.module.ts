import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UsersCardComponent } from './users-card';

@NgModule({
  declarations: [
    UsersCardComponent
  ],
  exports: [
    UsersCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class UsersCardComponentModule {}
