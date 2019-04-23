import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RecipeBusinessComponent } from './recipe-business';

@NgModule({
  declarations: [
      RecipeBusinessComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    RecipeBusinessComponent
  ],
})
export class RecipeBusinessComponentModule {}
