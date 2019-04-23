import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RECIPE_URL } from '../../app/app.url.config';

export interface RecipeCategory {
  name: string;
  slug: string;
}
export interface RecipeSubcategory {
  catId: string;
  name: string;
  slug: string;
}
@Injectable()
export class RecipeProvider {
  key$: BehaviorSubject<string | null>;
  nextQuery: any;

  constructor(public http: HttpClient) { 
  }

  addRecipe(recipe) {
    return this.http.post(RECIPE_URL + '/createRecipe', recipe);
  }

  getRecipeCategory(id) {
    return this.http.get(RECIPE_URL + '/getCategory/' + id);
  }

  getRecipeDetails(id) {
    return this.http.get(RECIPE_URL + '/getRecipe/' + id);
  }

  getUpdatedLikes(id) {
    return this.http.get(RECIPE_URL + '/getUpdatedLikes/' + id);
  }

  uploadRecipeImage(recipeId, photoId) {
    return this.http.patch(RECIPE_URL + '/uploadImages/' + recipeId, { photoId: photoId });
  }

  getNextMostLikedRecipes(skip) {
    return this.http.get(RECIPE_URL + '/getNextMostLikedRecipes/' + parseInt(skip));
  }
}