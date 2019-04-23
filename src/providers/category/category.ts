import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BUSINESS_URL, HUNTEDPRODUCT_URL, RECIPE_URL } from '../../app/app.url.config';

export interface Category {
  name: string;
  slug: string;
}

@Injectable()
export class CategoryProvider {

  constructor(public http: HttpClient) {
  }

  getBusinessCategories() {
    return this.http.get(BUSINESS_URL + '/getCategories');
  }

  getProductCategories() {
    return this.http.get(HUNTEDPRODUCT_URL + '/getCategories');
  }
  

  getRecipeCategories() {
    return this.http.get(RECIPE_URL + '/getCategories');
  }

}