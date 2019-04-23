import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExploreTagsFilterPage } from './explore-tags-filter';
import { RecipeCardComponentModule } from '../../components/recipe-card/recipe-card.module';
import { RecipeCategoryPipeModule } from '../../pipes/recipe-category/recipe-category.module';
import { SectionHeaderComponentModule } from '../../components/section-header/section-header.module';

@NgModule({
  declarations: [
    ExploreTagsFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ExploreTagsFilterPage),
    RecipeCardComponentModule,
    RecipeCategoryPipeModule,
    SectionHeaderComponentModule
  ],
})
export class ExploreTagsFilterPageModule {}
