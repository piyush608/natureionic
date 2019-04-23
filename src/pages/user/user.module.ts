import { UserLocationComponentModule } from './../../components/user-location/user-location.module';
import { RecipeCardComponentModule } from './../../components/recipe-card/recipe-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import { ProfileImageComponentModule } from '../../components/profile-image/profile-image.module';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module';
import { LevelCardComponentModule } from '../../components/level-card/level-card.module';

@NgModule({
  declarations: [
    UserPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    ProfileImageComponentModule,
    RecipeCardComponentModule,
    ProductCardComponentModule,
    UserLocationComponentModule,
    LevelCardComponentModule
  ],
})
export class UserPageModule {}
