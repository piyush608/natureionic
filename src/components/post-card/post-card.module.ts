import { ProfileImageComponentModule } from './../profile-image/profile-image.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PostCardComponent } from './post-card';

@NgModule({
  declarations: [
    PostCardComponent
  ],
  exports: [
    PostCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProfileImageComponentModule
  ],
})
export class PostCardComponentModule {}
