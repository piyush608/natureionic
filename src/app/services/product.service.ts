import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getRandom() {
    return this.http.get(environment.HUNTEDPRODUCT_URL + "/random");
  }

  getPopular() {
    return this.http.get(environment.HUNTEDPRODUCT_URL + "/getPopular");
  }

  addProduct(product) {
    return this.http.post(environment.HUNTEDPRODUCT_URL + "/create", product);
  }

  getDetails(_id) {
    return this.http.get(environment.HUNTEDPRODUCT_URL + "/getDetails/" + _id);
  }

  update(_id, recipe) {
    return this.http.patch(
      environment.HUNTEDPRODUCT_URL + "/update/" + _id,
      recipe
    );
  }

  getUserProducts(_id) {
    return this.http.get(
      environment.HUNTEDPRODUCT_URL + "/getUserProducts/" + _id
    );
  }

  getCategoryProducts(cat) {
    return this.http.get(
      environment.HUNTEDPRODUCT_URL + "/getCategoryProducts/" + cat
    );
  }
}
