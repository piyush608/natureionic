import { RecipeBusinessComponentModule } from './../../components/recipe-business/recipe-business.module';
import { BusinessListComponentModule } from './../../components/business-list/business-list.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRecipePage } from './add-recipe';

@NgModule({
  declarations: [
    AddRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(AddRecipePage),
    BusinessListComponentModule,
    RecipeBusinessComponentModule
  ],
})
export class AddRecipePageModule {}
