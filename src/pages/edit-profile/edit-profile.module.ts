import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { ProfileImageComponentModule } from '../../components/profile-image/profile-image.module';

@NgModule({
  declarations: [
    EditProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),
    ProfileImageComponentModule
  ],
})
export class EditProfilePageModule {}
