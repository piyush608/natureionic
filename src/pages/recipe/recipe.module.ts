import { RecipeBusinessComponentModule } from './../../components/recipe-business/recipe-business.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipePage } from './recipe';

@NgModule({
  declarations: [
    RecipePage,
  ],
  imports: [
    IonicPageModule.forChild(RecipePage),
    RecipeBusinessComponentModule
  ],
})
export class RecipePageModule {}
