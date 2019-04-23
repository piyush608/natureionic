import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipeCategory',
})
export class RecipeCategoryPipe implements PipeTransform {
  transform(recipes: any, category: string): any {
    // If filter is all
    if(category === 'all') return recipes;
    // Return updated recipes
    return recipes.filter(function(recipe) {
      if(recipe.category._id === category) return recipe;
    });
  }
}
