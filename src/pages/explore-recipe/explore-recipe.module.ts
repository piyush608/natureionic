import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreRecipePage } from './explore-recipe';
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { RecipeCategoryPipeModule } from '../../pipes/recipe-category/recipe-category.module';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    ExploreRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreRecipePage),
    RecipeCardComponentModule,
    RecipeCategoryPipeModule,
    SectionHeaderComponentModule
  ],
})
export class ExploreRecipePageModule {}
