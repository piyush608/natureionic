import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRandom() {
    return this.http.get(environment.RECIPE_URL + "/random");
  }

  addRecipe(recipe) {
    return this.http.post(environment.RECIPE_URL + "/create", recipe);
  }

  update(_id, recipe) {
    return this.http.patch(environment.RECIPE_URL + "/update/" + _id, recipe);
  }

  getUserRecipes(_id) {
    return this.http.get(environment.RECIPE_URL + "/getUserRecipes/" + _id);
  }

  getDetails(_id) {
    return this.http.get(environment.RECIPE_URL + "/getDetails/" + _id);
  }
}
