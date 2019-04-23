import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionsPage } from './collections';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';

@NgModule({
  declarations: [
    CollectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionsPage),
    MianHeaderComponentModule
  ],
})
export class CollectionsPageModule {}
