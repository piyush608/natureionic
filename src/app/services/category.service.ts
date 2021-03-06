import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(type) {
    return this.http.get(environment.CATEGORY_URL + "/getCategories/" + type);
  }

  getDetails(_id) {
    return this.http.get(environment.CATEGORY_URL + "/getDetails/" + _id);
  }
}
