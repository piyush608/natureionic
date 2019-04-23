import { SectionHeaderComponentModule } from './../../components/section-header/section-header.module';
import { SearchbarComponentModule } from './../../components/searchbar/searchbar.module';
import { ProductCardComponentModule } from './../../components/product-card/product-card.module';
import { RecipeCardComponentModule } from './../../components/recipe-card/recipe-card.module';
import { BusinessCardComponentModule } from './../../components/business-card/business-card.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';
import { CurrentLocationComponentModule } from '../../components/current-location/current-location.module';
import { UsersCardComponentModule } from '../../components/users-card/users-card.module';

@NgModule({
  declarations: [
    ResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultPage),
    BusinessCardComponentModule,
    RecipeCardComponentModule,
    ProductCardComponentModule,
    SearchbarComponentModule,
    CurrentLocationComponentModule,
    SectionHeaderComponentModule,
    UsersCardComponentModule,
  ],
})
export class ResultPageModule {}
