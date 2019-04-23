import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PointsPage } from './points';
import { ProgressBarComponentModule } from '../../components/progress-bar/progress-bar.module'

@NgModule({
  declarations: [
    PointsPage,
  ],
  imports: [
    IonicPageModule.forChild(PointsPage),
    ProgressBarComponentModule
  ],
})
export class PointsPageModule {}
