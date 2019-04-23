import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OcHoursComponent } from './oc-hours';
import { BookmarkComponentModule } from '../bookmark/bookmark.module';

@NgModule({
  declarations: [
    OcHoursComponent 
 ],
  exports: [
    OcHoursComponent
  ],
  imports: [
    IonicModule,
    BookmarkComponentModule
  ],
})
export class OcHoursComponentodule {}
