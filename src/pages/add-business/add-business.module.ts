import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBusinessPage } from './add-business';
import { OcHoursComponentodule } from "../../components/oc-hours/oc-hours.module";

@NgModule({
  declarations: [
    AddBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBusinessPage),
    OcHoursComponentodule,
  ],
})
export class AddBusinessPageModule {}
