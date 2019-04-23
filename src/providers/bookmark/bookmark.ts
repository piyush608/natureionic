import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CacheProvider } from "../cache/cache";
import { BASE_URL } from '../../app/app.url.config';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class BookmarkProvider {
  bookmarkBusinesses = [];
  bookmarkRecipes = [];
  bookmarkArticles = [];
  bookmarkProducts = [];
  bookmarkFactCards = [];
  constructor(
    private angCache: CacheProvider,
    private http: HttpClient,
    private angAuth: AuthProvider
  ) {
  }

  getBookmarkedBusinesses() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getUserBookmarkedBusinesses", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['businesses'].businesses.length > 0) {
        this.angCache.setBookmarkedBusinesses(res['businesses'].businesses);
      } else {
        this.angCache.setBookmarkedBusinesses(null);
      }
    });
  }

  getBookmarkedRecipes() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getUserBookmarkedRecipes", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['recipes'].recipes.length > 0) {
        this.angCache.setBookmarkedRecipes(res['recipes'].recipes);
      } else {
        this.angCache.setBookmarkedRecipes(null);
      }
    });
  }

  getBookmarkProducts() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getUserBookmarkedHuntedProducts", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['huntedProducts'].huntedProducts.length > 0) {
        this.angCache.setBookmarkedProducts(res['huntedProducts'].huntedProducts);
      } else {
        this.angCache.setBookmarkedProducts(null);
      }
    });
  }

  getBookmarkArticles() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getUserBookmarkedArticles", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['articles'].articles.length > 0) {
        this.angCache.setBookmarkedArticles(res['articles'].articles);
      } else {
        this.angCache.setBookmarkedArticles(null);
      }
    });
  }

  getBookmarkedVideos() {
    let headers = new HttpHeaders();

    this.http.get(BASE_URL + "/getUserBookmarkedVideos", { headers: headers.set('AUTHORIZATION', 'bearer ' + this.angAuth.getToken()) }).subscribe(res => {
      if (res['videos'].videos.length > 0) {
        this.angCache.setBookmarkedVideos(res['videos'].videos);
      } else {
        this.angCache.setBookmarkedVideos(null);
      }
    });
  }

  getBookmarkFactCards() {}

  bookmarkBusiness(businessId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkBusiness/' + uid, { businessId: businessId });
  }

  debookmarkBusiness(uid, businessSchema) {
    return this.http.patch(BASE_URL + '/debookmarkBusiness/' + uid, businessSchema);
  }

  bookmarkProduct(productId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkHuntedProduct/' + uid, { huntedProductId: productId });
  }

  debookmarkProduct(uid, huntedProductSchema) {
    return this.http.patch(BASE_URL + '/debookmarkHuntedProduct/' + uid, huntedProductSchema);
  }

  bookmarkRecipe(recipeId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkRecipe/' + uid, { recipeId: recipeId });
  }

  debookmarkRecipe(uid, recipeSchema) {
    return this.http.patch(BASE_URL + '/debookmarkRecipe/' + uid, recipeSchema);
  }

  bookmarkArticle(articleId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkArticle/' + uid, { articleId: articleId });
  }

  debookmarkArticle(uid, articleSchema) {
    return this.http.patch(BASE_URL + '/debookmarkArticle/' + uid, articleSchema);
  }

  bookmarkVideo(videoId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkVideo/' + uid, { videoId: videoId });
  }

  debookmarkVideo(uid, videoSchema) {
    return this.http.patch(BASE_URL + '/debookmarkVideo/' + uid, videoSchema);
  }

  bookmarkFactCard(cardId, innerCardId, uid) {
    return this.http.patch(BASE_URL + '/bookmarkFactCard/' + uid, { cardId: cardId, innerCardId: innerCardId });
  }

  debookmarkFactCard(uid, factCardSchema) {
    return this.http.patch(BASE_URL + '/debookmarkFactCard/' + uid, factCardSchema);
  }
}