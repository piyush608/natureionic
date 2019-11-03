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

  addProduct(product) {
    return this.http.post(environment.HUNTEDPRODUCT_URL + "/create", product);
  }

  update(_id, recipe) {
    return this.http.patch(
      environment.HUNTEDPRODUCT_URL + "/update/" + _id,
      recipe
    );
  }
}
