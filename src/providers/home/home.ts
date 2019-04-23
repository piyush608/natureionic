import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { GIUDE_URL, BUSINESS_URL, RECIPE_URL, HUNTEDPRODUCT_URL, CARDS_URL } from '../../app/app.url.config';

export interface Image {
  originalUrl: string;
  thumb100Url: string;
  thumb400Url: string;
}

@Injectable()
export class HomeProvider {
  key$: BehaviorSubject<string | null>;
  image$: BehaviorSubject<string | null>;

  constructor(public http: HttpClient) { 
  }

  getGuides() {
    return this.http.get(GIUDE_URL + '/getGuides');
  }

  getMostLikedBusinesses(city) {
    return this.http.get(BUSINESS_URL + '/getMostLikeBusinessesFromCity/' + city);
  }

  getMostLikedRecipes() {
    return this.http.get(RECIPE_URL + '/getMostLikedRecipes');
  }

  getMostLikedProducts() {
    return this.http.get(HUNTEDPRODUCT_URL + '/getMostLikedHuntedProducts');
  }

  getFactCards(cardId) {
    return this.http.get(CARDS_URL + '/getInnerCards/' + cardId);
  }
}