import { SearchbarComponentModule } from './../../components/searchbar/searchbar.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultRecipePage } from './result-recipe';
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { RecipeCategoryPipeModule } from '../../pipes/recipe-category/recipe-category.module';

@NgModule({
  declarations: [
    ResultRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(ResultRecipePage),
    SearchbarComponentModule,
    RecipeCardComponentModule,
    RecipeCategoryPipeModule
  ],
})
export class ResultRecipePageModule {}
