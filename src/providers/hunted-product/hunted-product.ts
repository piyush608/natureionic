import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HUNTEDPRODUCT_URL } from '../../app/app.url.config';

export interface ProductCategory {
  name: string;
  slug: string;
}

export interface ProductSubcategory {
  catId: string;
  name: string;
  slug: string;
}

@Injectable()
export class HuntedProductProvider {
  key$: BehaviorSubject<string | null>;
  nextQuery: any;

  constructor(public http: HttpClient) {
  }

  addHuntedProduct(huntedProduct) {
    return this.http.post(HUNTEDPRODUCT_URL + '/createHuntedProduct', huntedProduct);
  }

  getProductCategory(id) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getCategory/' + id);
  }

  getProductDetails(id) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getHuntedProduct/' + id);
  }

  getUpdatedLikes(id) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getUpdatedLikes/' + id);
  }

  uploadProductImage(productId, photoId) {
    return this.http.patch(HUNTEDPRODUCT_URL + '/uploadImages/' + productId, { photoId: photoId });
  }

  updateProduct(productId, body) {
    return this.http.patch(HUNTEDPRODUCT_URL + '/updateHuntedProduct/' + productId, body);
  }

  getNextMostLikedHuntedProducts(skip) {
    return this.http.get(HUNTEDPRODUCT_URL + '/getNextMostLikedHuntedProducts/' + parseInt(skip));
  }
}