import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetEmailPage } from './reset-email';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    ResetEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetEmailPage),
    SectionHeaderComponentModule
  ],
})
export class ResetEmailPageModule {}
