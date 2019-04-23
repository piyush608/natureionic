import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPage } from './my';
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { ProductCardComponentModule } from '../../components/product-card/product-card.module';
import { ProfileImageComponentModule } from '../../components/profile-image/profile-image.module';

@NgModule({
  declarations: [
    MyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPage),
    RecipeCardComponentModule,
    ProductCardComponentModule,
    ProfileImageComponentModule
  ],
})
export class MyPageModule {}
