import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from './reset-password';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage),
    SectionHeaderComponentModule
  ],
})
export class ResetPasswordPageModule {}
