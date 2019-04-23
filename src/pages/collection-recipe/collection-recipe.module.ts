import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionRecipePage } from './collection-recipe';
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { RecipeCategoryPipeModule } from '../../pipes/recipe-category/recipe-category.module';
import { MianHeaderComponentModule } from '../../components/mian-header/mian-header.module';

@NgModule({
  declarations: [
    CollectionRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionRecipePage),
    RecipeCardComponentModule,
    RecipeCategoryPipeModule,
    MianHeaderComponentModule
  ],
})
export class CollectionRecipePageModule {}
