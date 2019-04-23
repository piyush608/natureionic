import { SectionHeaderComponentModule } from './../../components/section-header/section-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';

@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    SectionHeaderComponentModule
  ],
})
export class AccountPageModule {}
