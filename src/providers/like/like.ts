import { AuthProvider } from "./../auth/auth";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BUSINESS_URL, RECIPE_URL, HUNTEDPRODUCT_URL, FORUM_URL } from '../../app/app.url.config';

@Injectable()
export class LikeProvider {

  constructor(public http: HttpClient, public angAuth: AuthProvider) {
  }

  likeBusiness(businessId, userId) {
    return this.http.patch(BUSINESS_URL + '/likeBusiness/' + businessId, { userId: userId });
  }

  dislikeBusiness(businessId, userSchema) {
    return this.http.patch(BUSINESS_URL + '/dislikeBusiness/' + businessId, userSchema);
  }

  likeRecipe(recipeId, userId) {
    return this.http.patch(RECIPE_URL + '/likeRecipe/' + recipeId, { userId: userId });
  }

  dislikeRecipe(recipeId, userSchema) {
    return this.http.patch(RECIPE_URL + '/dislikeRecipe/' + recipeId, userSchema);
  }

  likeHuntedProduct(huntedProductId, userId) {
    return this.http.patch(HUNTEDPRODUCT_URL + '/likeHuntedProduct/' + huntedProductId, { userId: userId });
  }

  dislikeHuntedProduct(huntedProductId, userSchema) {
    return this.http.patch(HUNTEDPRODUCT_URL + '/dislikeHuntedProduct/' + huntedProductId, userSchema);
  }

  likeForum(forumId, userId) {
    return this.http.patch(FORUM_URL + '/likeForum/' + forumId, { userId: userId });
  }

  dislikeForum(forumId, userId) {
    return this.http.patch(FORUM_URL + '/dislikeForum/' + forumId, { userId: userId });
  }

  unlikeForum(forumId, userSchema) {
    return this.http.patch(FORUM_URL + '/unlikeForum/' + forumId, userSchema);
  }

  unDislikeForum(forumId, userSchema) {
    return this.http.patch(FORUM_URL + '/unDislikeForum/' + forumId, userSchema);
  }
}